/**
 * A higher-order component (HOC) is an advanced technique
 * in React for reusing component logic.
 * HOCs are not part of the React API, per se.
 * They are a pattern that emerges from React's compositional nature.
 *
 * > Use HOCs For Cross-Cutting Concerns
 *
 * */
import React from 'react';
import Request from 're-quests';
import { ActivityIndicator, Text, View, StyleSheet, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { SYSTEM_WIDGETS } from '../../../utils/endpoints';
import { saveWidgetConfig } from '../../../redux/actions/config';
import theme from '../../../utils/theme';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '400',
        color: theme.black,
        backgroundColor: 'transparent'
    },
    informationText: {
        fontSize: 22,
        fontWeight: '500',
        color: theme.black,
        backgroundColor: 'transparent'
    },
});

export function withConfig(WrappedComponent) {

    class WithConfig extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                connectedToInternet: true
            };
        }

        // componentDidMount() {
        //     NetInfo.isConnected.addEventListener(
        //         'change',
        //         this._handleConnectivityChange
        //     );
        //     NetInfo.isConnected.fetch().done(
        //         (connectedToInternet) => {
        //             this.setState({connectedToInternet});
        //         }
        //     );
        // }
        //
        // componentWillUnmount() {
        //     NetInfo.isConnected.removeEventListener(
        //         'change',
        //         this._handleConnectivityChange
        //     );
        // }
        //
        // _handleConnectivityChange = (connectedToInternet) => {
        //     console.log("======connectedToInternet=======", connectedToInternet);
        //     this.setState({
        //         connectedToInternet,
        //     });
        // };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {config, ...passThroughProps} = this.props;

            if (config && Object.keys(config).length !== 0) {
                // Pass props to wrapped component
                return (
                    <WrappedComponent {...passThroughProps} />
                );
            }
            // if (!this.state.connectedToInternet) {
            //     return (
            //         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            //             <Text style={styles.informationText}>
            //                 You are not connected to internet.
            //             </Text>
            //             <ActivityIndicator size={'large'} color={theme.black}/>
            //             <Text style={styles.loadingText}>
            //                 Trying to establish a connection...
            //             </Text>
            //         </View>
            //
            //     )
            // }

            // Pass props to wrapped component
            return (
                <Request
                    url={SYSTEM_WIDGETS}
                    headers={{
                        'HOST-VERIS': 'apis.veris.in'
                    }}
                    onSuccess={this.onSuccess}>
                    <View style={styles.container}>
                        <Request.Start>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <ActivityIndicator size={'large'} color={theme.black}/>
                                <Text style={styles.loadingText}>
                                    Establishing connection with server
                                </Text>
                            </View>
                        </Request.Start>
                    </View>
                </Request>
            );
        }

        onSuccess = (response) => {
            this.props.dispatch(saveWidgetConfig(response.data));
        }
    }

    WithConfig.displayName = `WithConfig(${getDisplayName(WrappedComponent)})`;
    return connect((store) => {
        return {
            config: store.config
        }
    })(WithConfig);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
