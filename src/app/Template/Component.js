import React from 'react';
import PropTypes from 'prop-types';

import ComponentFactory from 'shell/v3-core/components';


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
