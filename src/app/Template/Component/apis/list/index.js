import React from 'react';
import PropTypes from 'prop-types';
import { toDotNotation } from 'utils/index';
import { getDisplayName } from 'recompose';

import Component from 'app/Template/Component';
import { withValues } from 'app/Template/Component/apis/values';

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
        static defaultProps = {
            value: [],
            orientation: 'vertical'
        };
        static contextTypes = {
            widget: PropTypes.object,
            setVariable: PropTypes.func,
            enqueue: PropTypes.func,
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
    WithRecyclerViewProps.propTypes = {
        value: PropTypes.arrayOf(PropTypes.object),
        orientation: PropTypes.oneOf(['horizontal', 'vertical'])
    };
    return WithRecyclerViewProps;
}
