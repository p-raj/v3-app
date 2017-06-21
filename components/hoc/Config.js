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
import Request, { STATE }from 're-quests';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import RN from 'react-native';
import { Widgets } from '../../../common/endpoints';
import { saveWidgetConfig } from '../../../redux/actions/config';

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
                    url={Widgets.system}
                    headers={{
                        'HOST-VERIS': 'apis.veris.in'
                    }}
                    onSuccess={this.onSuccess}>
                    <View>
                        <Request.RenderIf stateIn={[STATE.INIT]}>
                            <View>
                                <RN.ActivityIndicator size={"large"} color='black'/>
                                <Text>Downloading Config</Text>
                            </View>
                        </Request.RenderIf>
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
