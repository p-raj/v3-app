import React from 'react';
import PropTypes from 'prop-types';
import View from '../../../v3-core/components/ui/View/index';

import Section from './Section';


class WidgetLayout extends React.Component {
    render() {
        const sections = this.props.sections.map((section, index) => {
            return <Section key={index}
                            isSelectableItem={this.props.isSelectableItem}
                            showBorder={this.props.showBorder}
                            onItemSelect={this.onItemSelect}
                            section={section}/>
        });
        return (
            <View>
                {sections}
            </View>
        );
    }

    onItemSelect = (value) => {
        if (this.props.onItemSelect) {
            this.props.onItemSelect(value);
        }
    };
}

WidgetLayout.defaultProps = {
    sections: []
};

WidgetLayout.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired
        })).isRequired
    })).isRequired,

    // TODO
    // remove these from here,
    // there should be wrapper components
    // for the same :/
    onItemSelect: PropTypes.func,
    showBorder: PropTypes.bool,
    isSelectableItem: PropTypes.bool
};

export default WidgetLayout;