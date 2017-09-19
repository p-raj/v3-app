import React from 'react';
import PropTypes from 'prop-types';
import Request, { RequestStore } from 're-quests';
import { connect } from 'react-redux';

import store from '../../../redux/store';
import { BASE_URL } from '../../../utils/endpoints';


class RequestProcess extends React.Component {
    render() {
        // noinspection JSUnusedLocalSymbols
        // eslint-disable-next-line
        let {name, auth, config, ...props} = this.props;

        const paths = Object.keys(config.widget.schema.paths);
        const process = paths.find(
            (process) => config.widget.schema
                .paths[process].post.summary === name);

        return (
            <RequestStore store={store}>
                <Request
                    url={`${BASE_URL}${process}`}
                    method='post'
                    headers={{
                        'HOST-VERIS': 'apis.veris.in'
                    }}
                    {...props}
                    ref={(request) => {
                        this.request = request;
                    }}
                />
            </RequestStore>
        );
    }

    fire = () => {
        this.request.fire();
    }
}

RequestProcess.propTypes = {
    name: PropTypes.string.isRequired
};

RequestProcess = connect((store) => {
    return {
        config: store.config,
        auth: store.auth
    }
}, null, null, {withRef: true})(RequestProcess);

export default RequestProcess;
