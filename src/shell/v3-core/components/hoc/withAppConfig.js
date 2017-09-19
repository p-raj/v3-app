import React from 'react';
import Request from 're-quests';
import { getDisplayName } from 'recompose';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { saveWidgetConfig } from 'shell/redux/actions/config';
import { SYSTEM_WIDGETS } from 'shell/utils/endpoints';
import theme from 'shell/utils/theme';


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
