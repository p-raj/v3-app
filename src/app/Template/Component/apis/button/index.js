import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { getDisplayName } from 'recompose';


export function withButtonProps(WrappedComponent) {
    @themr('button')
    class WithButtonProps extends React.Component {
        static defaultProps = {
            style: {
                color: '#000'
            }
        };
        static contextTypes = {
            enqueue: PropTypes.func,
        };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            const {
                value,
                style,
                // eslint-disable-next-line
                theme,
                ...passThroughProps
            } = this.props;

            const {
                color,
                ...passThroughStyle
            } = style;

            // Pass props to wrapped component
            return (
                <WrappedComponent
                    {...passThroughProps}
                    style={passThroughStyle}
                    color={color}
                    title={value}
                    onPress={this.onPress}/>
            );
        }

        onPress = () => {
            if (!this.props.action) return;
            this.context.enqueue(this.props.action);
        }
    }

    WithButtonProps.displayName = `WithButtonProps(${getDisplayName(WrappedComponent)})`;
    return WithButtonProps;
}
