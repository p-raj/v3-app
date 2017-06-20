import React from 'react';

export function withSpinnerProps(WrappedComponent) {
    class WithSpinnerProps extends React.Component {
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
    WithSpinnerProps.defaultProps = {
        hidden: false,
        size: 'small',
        style: {
            color: '#000'
        }
    };
    return WithSpinnerProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}