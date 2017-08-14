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
 * Why HOC makes sense here ?
 * - We'll abstract out the props transformation for all the platforms in this file.
 *
 * */
export function withCheckBoxProps(WrappedComponent) {
    class WithCheckBoxProps extends React.Component {
        static contextTypes = {
            setVariable: PropTypes.func,
            enqueue: PropTypes.func,
        };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            const {
                // eslint-disable-next-line
                label, value, color, onCheckedChange, action, ...passThroughProps
            } = this.props;

            // Pass props to wrapped component
            return (
                <WrappedComponent
                    title={label}
                    checked={value}
                    checkboxColor={color}
                    onCheckedChange={this.onCheckedChange}
                    {...passThroughProps}
                />
            );
        }

        onCheckedChange = (isChecked) => {
            const props = this.props;
            this.context.setVariable(props.name, isChecked);

            if (!this.props.action) return;

            this.context.enqueue(this.props.action);
        }
    }

    WithCheckBoxProps.displayName = `WithCheckBoxProps(${getDisplayName(WrappedComponent)})`;
    return WithCheckBoxProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
