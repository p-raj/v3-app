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
export function withAutoCompleteProps(WrappedComponent) {
    class WithAutoCompleteProps extends React.Component {
        // contextTypes is a required static property to declare
        // what you want from the context
        static contextTypes = {
            widget: PropTypes.object,
            setVariable: PropTypes.func,
            enqueue: PropTypes.func,
        };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {placeholder, list, ignoreCase, action, setVariable, ...passThroughProps} = this.props;

            // Pass props to wrapped component
            return (
                <WrappedComponent
                    placeholder={placeholder}
                    ignoreCase={ignoreCase}
                    list={list}
                    onItemSelected={this.onItemSelected}
                    {...passThroughProps}
                />
            );
        }

        onItemSelected = (selectedValue) => {
            const props = this.props;
            this.context.setVariable(props.name, selectedValue);

            if (!this.props.action) return;

            this.context.enqueue(this.props.action);
        }
    }

    WithAutoCompleteProps.displayName = `WithAutoCompleteProps(${getDisplayName(WrappedComponent)})`;
    return WithAutoCompleteProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
