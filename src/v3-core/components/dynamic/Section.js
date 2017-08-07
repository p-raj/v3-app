import React from 'react';
import PropTypes from 'prop-types';
import View from '../../components/ui/View';

import Component from './Component';

export const Section = ({section}) => {
    const components = section.items.map((component, index) => {
        const {type, ...props} = component;
        return <Component key={index} type={type} {...props} />
    });

    return (
        <View style={{flex: 1}}>
            {components}
        </View>
    );
};

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
    }).isRequired
};

export default Section;