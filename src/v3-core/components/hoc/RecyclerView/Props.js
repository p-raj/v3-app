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
import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../dynamic/Component';
import { withValues } from '../withValues';
import { toDotNotation } from '../../../utils';


class WithValueItem extends React.Component {
    // noinspection JSUnusedGlobalSymbols
    getChildContext() {
        const {value} = this.props;

        // TODO
        // a possibility is if some component
        // accepts a dictionary, the dictionary
        // gets flattened out here
        const values = toDotNotation(value);
        return {
            values: values
        };
    }

    render() {
        const {type, ...props} = this.props.item;
        return (
            <Component type={type} {...props}/>
        )
    }
}


WithValueItem.childContextTypes = {
    values: PropTypes.object
};

WithValueItem.propTypes = {
    item: PropTypes.shape({
        type: PropTypes.string.isRequired,
        components: PropTypes.array
    }).isRequired,
    value: PropTypes.object.isRequired
};


export function withRecyclerViewProps(WrappedComponent) {
    class WithRecyclerViewProps extends React.Component {
        // contextTypes is a required static property to declare
        // what you want from the context
        static contextTypes = {
            widget: React.PropTypes.object,
            setVariable: React.PropTypes.func,
            enqueue: React.PropTypes.func,
        };

        render() {
            // eslint-disable-next-line
            const {
                value,
                orientation,
                item,
                ...passThroughProps
            } = this.props;

            const RVItem = withValues(WithValueItem);
            const horizontal = orientation === 'horizontal';
            return (
                <WrappedComponent
                    dataSource={value}
                    onItemClicked={this.onItemClicked}
                    horizontal={horizontal}
                    renderRow={(data)=> {
                        return <RVItem item={item} value={data} />
                    }}
                    {...passThroughProps}
                />
            );
        }

        onItemClicked = (item) => {
            const props = this.props;
            this.context.setVariable(props.item.name, item);

            if (!this.props.action) return;

            this.context.enqueue(this.props.action);
        }
    }

    WithRecyclerViewProps.displayName = `WithRecyclerViewProps(${getDisplayName(WrappedComponent)})`;
    WithRecyclerViewProps.defaultProps = {
        value: [],
        orientation: 'vertical'
    };
    WithRecyclerViewProps.propTypes = {
        value: PropTypes.arrayOf(PropTypes.object),
        orientation: PropTypes.oneOf(['horizontal', 'vertical'])
    };
    return WithRecyclerViewProps;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
