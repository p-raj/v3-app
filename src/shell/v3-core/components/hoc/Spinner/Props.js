import React from 'react';
import { getDisplayName } from 'recompose';

export function withSpinnerProps(WrappedComponent) {
    class WithSpinnerProps extends React.Component {
        static defaultProps = {
            hidden: false,
            size: 'small',
            style: {
                color: '#000'
            }
        };
        render() {
            // filter out extra props that are specific to this HOC
            // and shouldn't be passed through
            const {size, style, hidden, ...passThroughProps} = this.props;
            const {color, ...passThroughStyle} = style;

            return (
                <WrappedComponent
                    {...passThroughProps}
                    style={passThroughStyle}
                    color={color}
                    animating={!hidden}
                    size={size}/>
            )
        }
    }

    WithSpinnerProps.displayName = `WithSpinnerProps(${getDisplayName(WrappedComponent)})`;
    return WithSpinnerProps;
}
