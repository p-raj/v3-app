import PropTypes from 'prop-types';
/**
 *
 * An items array contains a list of items that users can interact with.
 * Each Item can be a:
 *  - Component: A single basic UI unit (such as a label or an image)
 *  - Layout: A composition of multiple components.
 */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Component from './Component';


class Item extends React.Component {
    render() {
        const {
            item,
            showBorder,
            isSelectableItem
        } = this.props;
        const {
            components,
            ...props
        } = item;

        /*
         * The item can be identified as a component or an item
         * based on the property components.
         *
         * Components can have nested items.
         * */
        const isContainer = !!components;

        /*
         * A layout is again an Item
         * & needs to handle further nesting.
         * */

        if (!isContainer && isSelectableItem) {
            return (
                <View style={{
                    flex: 1,
                    borderStyle: 'dashed',
                    borderWidth: showBorder ? 1 : 0,
                    borderColor: 'grey',
                    margin: showBorder ? 5 : 0
                }}>
                    <Component {...props}/>
                    <TouchableOpacity
                        style={{position: 'absolute', width: '100%', height: '100%'}}
                        onPress={() => this.onItemSelect(this.props.item)}>
                    </TouchableOpacity>
                </View>
            )
        }
        else if (!isContainer && !isSelectableItem) {
            return (
                <Component {...props}/>
            )
        }

        /*
         * Collect all the items from the components.
         * */
        const items = components.map((item, index) => {
            return <Item key={index}
                         item={item}
                         isSelectableItem={isSelectableItem}
                         showBorder={showBorder}
                         onItemSelect={this.onItemSelect}/>
        });

        return (
            <Component {...props}>
                {items}
            </Component>
        );
    }

    onItemSelect = (value) => {
        this.props.onItemSelect(value);
    };
}

Item.propTypes = {
    item: PropTypes.shape({
        type: PropTypes.string.isRequired,
        components: PropTypes.array
    }).isRequired,

    // TODO
    // remove these from here,
    // there should be wrapper components
    // for the same :/
    onItemSelect: PropTypes.func,
    showBorder: PropTypes.bool,
    isSelectableItem: PropTypes.bool
};

export default Item;