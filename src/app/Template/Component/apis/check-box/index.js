import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';


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
