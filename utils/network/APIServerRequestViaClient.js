import React from 'react';
import { connect } from 'react-redux';

import AuthenticatedRequest from './AuthenticatedRequest';


class APIServerRequestViaClient extends React.Component {
    render() {
        let {headers, membership, ...props} = this.props;

        // don't bother sending request
        if (!membership) {
            console.warn('no membership selected');
            return null;
        }

        // safety check, just in case headers was not passed :)
        // we don't want to override the headers,
        // we just wanna make sure that correct Authorization header
        // is being passed for the request that need authentication
        headers = headers || {};
        headers['HOST-VERIS'] = 'apis.veris.in';
        headers['VERIS-RESOURCE'] = `Veris organization:${membership.organization.uuid}:member:${membership.uuid}`;

        return (
            <AuthenticatedRequest
                {...props}
                headers={headers}
                ref={(request) => {
                    this.request = request;
                }}
            />
        );
    }

    fire = () => {
        this.request.getWrappedInstance().fire();
    }
}


APIServerRequestViaClient = connect((store) => {
    return {
        membership: store.memberships.selected
    }
}, null, null, {withRef: true})(APIServerRequestViaClient);

export default APIServerRequestViaClient;
