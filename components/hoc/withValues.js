import React from 'react';
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
 * For instance. TextInput (React Native) expects a `secureTextEntry` attribute,
 * but the API and config params has been designed to use `secure` attribute.
 *
 * */
export function withValues(WrappedComponent) {
    class WithValues extends React.Component {
        render() {
            const {name, ...props} = this.props;

            // check if there's a value in context to be overridden,
            // else pass in the existing value
            props.value = (this.context.values || {})[name] || props.value;

            return (
                <WrappedComponent name={name} {...props} />
            );
        }
    }

    WithValues.displayName = `WithValues(${getDisplayName(WrappedComponent)})`;
    WithValues.contextTypes = {
        values: PropTypes.object
    };
    return WithValues;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
