import React from 'react';
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
 * For instance. Label (custom component) expects a `value` attribute,
 * but the API and config params has been designed to use `text` attribute.
 *
 * Why HOC makes sense here ?
 * - We'll abstract out the props transformation for all the platforms in this file.
 *
 * */
export function withTextProps(WrappedComponent) {
    @themr('text')
    class WithTextProps extends React.Component {
        static contextTypes = {
            enqueue: React.PropTypes.func,
        };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {value, action, ...passThroughProps} = this.props;

            return (
                <WrappedComponent
                    {...passThroughProps}
                    onPress={this.onPress}>
                    {value}
                </WrappedComponent>
            )
        }

        onPress = () => {
            if (!this.props.action) return;

            this.context.enqueue(this.props.action);
        }
    }

    WithTextProps.displayName = `WithTextProps(${getDisplayName(WrappedComponent)})`;
    return WithTextProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}