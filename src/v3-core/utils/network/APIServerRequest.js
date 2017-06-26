import React from 'react';
import { connect } from 'react-redux';

import AuthenticatedRequest from './AuthenticatedRequest';


class APIServerRequestViaAdmin extends React.Component {

    render() {
        let {headers, ...props} = this.props;
        // safety check, just in case headers was not passed :)
        // we don't want to override the headers,
        // we just wanna make sure that correct Authorization header
        // is being passed for the request that need authentication
        headers = headers || {};
        headers['HOST-VERIS'] = this.props.hostHeader || 'apis.veris.in';
        headers['VERIS-RESOURCE'] = `Veris organization:${this.props.organization.uuid}`;

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


APIServerRequestViaAdmin = connect((store) => {
    return {
        organization: store.session.organization
    }
}, null, null, {withRef: true})(APIServerRequestViaAdmin);

export default APIServerRequestViaAdmin;
