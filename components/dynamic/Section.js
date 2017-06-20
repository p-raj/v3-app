import React from 'react';
import PropTypes from 'prop-types';
import View from '../../../app/components/ui/View/index';

import Item from './Item';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.onItemSelect = this.onItemSelect.bind(this)
    }

    onItemSelect(value) {
        this.props.onItemSelect(value)
    }

    render() {
        const items = this.props.section.items.map((item, index) => {
            return <Item key={index}
                         isSelectableItem={this.props.isSelectableItem}
                         showBorder={this.props.showBorder}
                         onItemSelect={this.onItemSelect}
                         item={item}/>
        });

        return (
            <View>
                {items}
            </View>
        );
    }
}

Section.defaultProps = {
    section: {
        items: []
    }
};

Section.propTypes = {
    section: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired
        })).isRequired
    }).isRequired,

    // TODO
    // remove these from here,
    // there should be wrapper components
    // for the same :/
    onItemSelect: PropTypes.func,
    showBorder: PropTypes.bool,
    isSelectableItem: PropTypes.bool
};

export default Section;