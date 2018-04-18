/**
 * A higher-order component (HOC) is an advanced technique
 * in React for reusing component logic.
 * HOCs are not part of the React API, per se.
 * They are a pattern that emerges from React's compositional nature.
 *
 * > Use HOCs For Cross-Cutting Concerns
 * Authentication is a Cross-Cutting Concern for us :)
 *
 * */
import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import AuthScreen from '../../../screens/screen-components/AuthComponent';

import loadPersistentData from '../../../redux/actions/storage';
import refreshToken from '../../../../src/redux/actions/refreshToken';
import { FAILED, START } from '../../../utils/constants';
import { withConfig } from './Config';


export function withAuthentication(WrappedComponent) {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isAuthenticated: this.isAuthenticated(props)
            }
        }

        componentWillMount() {
            this.authenticate(this.props);
        }

        /**
         * componentWillReceiveProps() is invoked before a mounted component receives new props.
         * If you need to update the state in response to prop changes (for example, to reset it),
         * you may compare this.props and nextProps and perform state
         * transitions using this.setState() in this method.
         * @param nextProps
         */
        componentWillReceiveProps(nextProps) {
            // Note that React may call this method even if the props have not changed,
            // so make sure to compare the current and next values if you
            // only want to handle changes.
            // This may occur when the parent component causes your component to re-render.
            // So we won't trigger a state change when its the same
            this.authenticate(nextProps);
            this.setState({
                isAuthenticated: this.isAuthenticated(nextProps)
            });
        }

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {auth, storage, ...passThroughProps} = this.props;

            // Inject props into the wrapped component.
            // These are usually state values or
            // instance methods.
            const {isAuthenticated} = this.state;

            // if the client isn't authenticated
            // we'll ask it to authenticate :)
            const Component = (isAuthenticated) ? WrappedComponent : AuthScreen;

            // Pass props to wrapped component
            return (
                <Component
                    auth={auth}
                    {...passThroughProps}
                />
            );
        }

        componentDidMount() {
            // Dispatch action to load data from storage
            if (!this.props.storage) {
                this.props.dispatch(loadPersistentData())
            }
        }

        isAuthenticated = (props) => {
            // when we are constructing the component
            // it's highly unlikely that the client is authenticated
            // since we aim this component to be used at the highest level
            if (!props.storage) return false;

            if (_.isEmpty(props.auth) || !props.auth.token) {
                // the data has been loaded from the storage
                // but seems like the client hasn't authenticated yet :(
                return false;
            }

            // oh nice, he has been authenticated once :)
            // let's check whether the token loaded from storage is still valid
            // let validTillTimestamp = props.auth.created_at_millis + (props.auth.expires_in * 1000);
            // if (!validTillTimestamp) {
            //     return false;
            // }

            // if (new Date() > new Date(validTillTimestamp)) {
            //     // seems like the token is out of date
            //     // unfortunately, we still have to return a false
            //     return false;
            // }

            // finally, seems like everything is fine,
            // then the client must be authenticated
            return true;
        };

        authenticate = (props) => {
            const isAuthenticated = this.isAuthenticated(props);

            // the client is already authenticated
            // and the token has not yet expired
            // no need to update the token
            if (isAuthenticated) return;

            // now either the client is not authenticated at all
            // or the token has expired
            // since we don't have the refresh token,
            // it doesn't make sense to try and login using it :P
            if (!props.auth.refresh_token) return;

            // seems like the token is out of date,
            // let's get a new token using the refresh token loaded from storage
            // just a quick check for the status of existing token before proceeding
            switch (props.refreshToken.status) {
                case START:
                    // let's not do anything stupid here :P
                    // the request is already in progress
                    break;
                case FAILED:
                    // oh crap, the request failed
                    // someone terminated the session forcefully ?
                    // that's doesn't smell good
                    // props.router.replace('/auth');
                    break;
                default:
                    props.dispatch(refreshToken(props.auth.refresh_token));
            }
        }
    }

    WithAuthentication.displayName = `WithAuthentication(${getDisplayName(WrappedComponent)})`;
    return withConfig(connect((store) => {
        return {
            auth: store.auth,
            storage: store.storage,
            refreshToken: store.refreshToken
        }
    })(WithAuthentication));
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
