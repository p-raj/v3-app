import React from 'react';


export function withAnimationProps(WrappedComponent) {
    class WithAnimationProps extends React.Component {
        render() {
            const {value, ...props} = this.props;

            return (
                <WrappedComponent
                    ref={animation => this.animation = animation}
                    source={value}
                    {...props}
                />
            );
        }

        componentDidMount() {
            this.animation.play();
        }
    }

    WithAnimationProps.defaultProps = {
        style: {
            width: 56,
            height: 56
        }
    };
    WithAnimationProps.displayName = `WithAnimationProps(${getDisplayName(WrappedComponent)})`;
    return WithAnimationProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
