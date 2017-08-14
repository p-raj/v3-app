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
 *
 * Why HOC makes sense here ?
 * - We'll abstract out the props transformation for all the platforms in this file.
 *
 * */
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
            const {disabled, action, value, placeholder, style} = this.props;

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

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
