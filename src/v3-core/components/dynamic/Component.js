import React from 'react';
import PropTypes from 'prop-types';

import ComponentFactory from '..';


const Component = ({type, ...props}) => {
    let Component = ComponentFactory.get(type);
    return (
        <Component {...props}/>
    );
};

Component.propTypes = {
    type: PropTypes.string.isRequired
};

export default Component;
