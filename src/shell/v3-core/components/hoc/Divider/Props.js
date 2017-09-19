import React from 'react';
import { getDisplayName } from 'recompose';


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
 * For instance. TextInput (React Native) expects a `secureTextEntry` attribute,
 * but the API and config params has been designed to use `secure` attribute.
 *
 * Why HOC makes sense here ?
 * - We'll abstract out the props transformation for all the platforms in this file.
 *
 * */
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
        color: "#000",
        orientation: "horizontal"
    };

    WithDividerProps.displayName = `WithDividerProps(${getDisplayName(WrappedComponent)})`;
    return WithDividerProps;
}
