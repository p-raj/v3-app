import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { getDisplayName } from 'recompose';


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
            const {secure, theme, value, placeholder, action, style, disabled} = this.props;

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
