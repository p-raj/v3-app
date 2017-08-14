import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
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
export function withImageProps(WrappedComponent) {
    @themr('image')
    class WithImageProps extends React.Component {
        static defaultProps = {
            value: '',
            style: {
                marginTop: 16,
                borderRadius: 56,
                width: 56,
                height: 56,
                backgroundColor: '#333'
            }
        };
        static contextTypes = {
            enqueue: PropTypes.func,
        };

        render() {
            // eslint-disable-next-line
            const {value, action, style, ...passThroughProps} = this.props;
            const {width, height, ...passThroughStyle} = style;

            if (!action) {
                return (
                    <WrappedComponent
                        {...passThroughProps}
                        source={{uri: value, width, height}}
                        style={style}/>
                )
            }

            const containerStyle = {
                width,
                height
            };
            const componentStyle = {
                ...passThroughStyle,
                width: '100%',
                height: '100%'
            };

            /*
             * wrap the component in TouchableOpacity when action is supplied,
             * TouchableOpacity makes sure the component is clickable on web. Also,
             * the style for width, height & extracted out, since TouchableOpacity
             * is the main component with Image being only a child.
             * */
            return (
                <TouchableOpacity onPress={this.onPress} style={containerStyle}>
                    <WrappedComponent
                        {...passThroughProps}
                        source={{uri: value, width, height}}
                        style={componentStyle}/>
                </TouchableOpacity>
            );
        }

        onPress = () => {
            if (!this.props.action) return;
            this.context.enqueue(this.props.action);
        }
    }

    WithImageProps.displayName = `WithImageProps(${getDisplayName(WrappedComponent)})`;
    WithImageProps.propTypes = {
        value: PropTypes.string.isRequired,
        style: PropTypes.shape({
            width: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            height: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            backgroundColor: PropTypes.string
        })
    };
    return WithImageProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}