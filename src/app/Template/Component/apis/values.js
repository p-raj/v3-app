import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';


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
