import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';


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
