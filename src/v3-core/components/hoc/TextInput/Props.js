import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';

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
export function withTextInputProps(WrappedComponent) {
    @themr('text-input')
    class WithTextInputProps extends React.Component {
        static contextTypes = {
            setVariable: PropTypes.func,
            enqueue: PropTypes.func,
        };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {secure, value, placeholder, action, style, disabled} = this.props;

            // all the props are passed as strings and even 'false'
            // will be evaluated as true
            // why all strings?
            // philosophy credits: Jasonette
            // The JSON we use is completely string based. All values are string.
            // Sometimes this may look inconvenient, but assuming everything is a string provides
            // lots of convenience when JSON parsing is concerned.
            const isSecure = ['true', 'yes', true].indexOf(secure) !== -1;

            // Pass props to wrapped component
            return (
                <WrappedComponent
                    defaultValue={value}
                    secureTextEntry={isSecure}
                    onChangeText={this.onChangeText}
                    placeholder={placeholder}
                    editable={!disabled}
                    style={style}
                />
            );
        }

        onChangeText = (text) => {
            const props = this.props;
            this.context.setVariable(props.name, text);

            if (!this.props.action) return;

            this.context.enqueue(this.props.action);
        }
    }

    WithTextInputProps.displayName = `WithTextInputProps(${getDisplayName(WrappedComponent)})`;
    return WithTextInputProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
