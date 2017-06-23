import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Request from 're-quests';


class AuthenticatedRequest extends React.Component {
    render() {
        // noinspection JSUnusedLocalSymbols
        // eslint-disable-next-line
        let {headers, fake, auth, ...props} = this.props;
        // safety check, just in case headers was not passed :)
        // we don't want to override the headers,
        // we just wanna make sure that correct Authorization header
        // is being passed for the request that need authentication
        headers = headers || {};
        // not sure if this API is good enough!!
        if (fake) return null;

        return (
            <Request
                {...props}
                headers={headers}
                ref={(request) => {
                    this.request = request;
                }}
            />
        );
    }

    fire = () => {
        this.request.fire();
    }
}

AuthenticatedRequest.propTypes = {
    ...Request.propTypes,
    fake: PropTypes.bool
};

AuthenticatedRequest = connect((store) => {
    return {
        auth: store.auth
    }
}, null, null, {withRef: true})(AuthenticatedRequest);

export default AuthenticatedRequest;
