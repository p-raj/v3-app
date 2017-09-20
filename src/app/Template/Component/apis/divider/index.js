import React from 'react';
import { getDisplayName } from 'recompose';


export function withDividerProps(WrappedComponent) {
    class WithDividerProps extends React.Component {
        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {thickness, color, orientation} = this.props;

            // Pass props to wrapped component
            return (
                <WrappedComponent
                    thickness={thickness}
                    color={color}
                    orientation={orientation}
                />
            );
        }
    }

    WithDividerProps.defaultProps = {
        color: '#000',
        orientation: 'horizontal'
    };

    WithDividerProps.displayName = `WithDividerProps(${getDisplayName(WrappedComponent)})`;
    return WithDividerProps;
}
