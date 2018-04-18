import React from 'react';


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
export function withDropdownProps(WrappedComponent) {
    class WithDropdownProps extends React.Component {
        static contextTypes = {
            setVariable: React.PropTypes.func,
            enqueue: React.PropTypes.func,
        };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {placeholder, list, itemStyle, placeholderBackground, placeholderColor, listHeight, onItemSelected} = this.props;

            // Pass props to wrapped component
            return (
                <WrappedComponent
                    list={list}
                    placeholder={placeholder}
                    itemStyle={itemStyle}
                    placeholderBackground={placeholderBackground}
                    placeholderColor={placeholderColor}
                    listHeight={listHeight}
                    onItemSelected={this.onItemSelected}
                />
            );
        }

        onItemSelected = (item) => {
            const props = this.props;
            this.context.setVariable(props.name, item);

            if (!this.props.action) return;

            this.context.enqueue(this.props.action);
        }
    }

    WithDropdownProps.defaultProps = {
        placeholderColor: 'black',
        listHeight: 200
    };

    WithDropdownProps.displayName = `WithDropdownProps(${getDisplayName(WrappedComponent)})`;
    return WithDropdownProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
