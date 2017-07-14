import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * A higher-order component (HOC) is an advanced technique
 * in React for reusing component logic.
 * HOCs are not part of the React API, per se.
 * They are a pattern that emerges from React's compositional nature.
 *
 * Each of our component will be designed to handle only certain props,
 * all the props are either dropped or transformed as
 * per the requirements of the native components.
 *
 * */
export function withStyle(WrappedComponent) {
    class WithStyle extends React.Component {
        render() {
            const {style, ...props} = this.props;
            if (!style) {
                return (
                    <WrappedComponent {...props} />
                );
            }

            const sheet = StyleSheet.create({style});
            return (
                <WrappedComponent {...props} style={[sheet.style]} />
            );
        }
    }

    WithStyle.displayName = `WithStyle(${getDisplayName(WrappedComponent)})`;
    WithStyle.contextTypes = {
        values: PropTypes.object
    };
    return WithStyle;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
