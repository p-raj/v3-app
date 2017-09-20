import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';


export function withTextAreaProps(WrappedComponent) {
    class WithTextAreaProps extends React.Component {
        static contextTypes = {
            enqueue: PropTypes.func,
            setVariable: PropTypes.func,
        };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {disabled, action, theme, value, placeholder, style} = this.props;

            // Pass props to wrapped component
            return (
                <WrappedComponent
                    onChangeText={this.onChangeText}
                    editable={!disabled}
                    defaultValue={value}
                    placeholder={placeholder}
                    style={style}/>
            );
        }

        onChangeText = (text) => {
            const props = this.props;
            this.context.setVariable(props.name, text);

            if (!this.props.action) return;

            this.context.enqueue(this.props.action);
        }
    }

    WithTextAreaProps.displayName = `WithTextAreaProps(${getDisplayName(WrappedComponent)})`;
    return WithTextAreaProps;
}
