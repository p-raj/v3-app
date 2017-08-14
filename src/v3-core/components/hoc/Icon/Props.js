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
 * For instance. Image (React Native) expects a `source` attribute,
 * but the API and config params has been designed to use `url` attribute.
 *
 * Why HOC makes sense here ?
 * - We'll abstract out the props transformation for all the platforms in this file.
 *
 * */

export function withIconProps(WrappedComponent) {
    @themr('icon')
    class WithIconProps extends React.Component {
        static defaultProps = {
            type: 'font-awesome',
            style: {
                color: '#000'
            }
        };
        static contextTypes = {
            enqueue: PropTypes.func,
        };

        render() {
            const {type, icon, style, ...passThroughProps} = this.props;

            // eslint-disable-next-line
            const {color, ...passThroughStyle} = style;

            return (
                <WrappedComponent
                    {...passThroughProps}
                    type={type}
                    name={icon}
                    color={color}
                    onPress={this.onPress}/>
            );
        }

        onPress = () => {
            if (!this.props.action) return;
            this.context.enqueue(this.props.action);
        }
    }

    WithIconProps.displayName = `WithIconProps(${getDisplayName(WrappedComponent)})`;
    WithIconProps.propTypes = {
        icon: PropTypes.string.isRequired
    };
    return WithIconProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}