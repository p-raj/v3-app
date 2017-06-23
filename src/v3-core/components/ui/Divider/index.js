import React from 'react';
import PropTypes from 'prop-types';
import HorizontalDivider from '../HorizontalDivider/index';
import VerticalDivider from '../VerticalDivider/index';


const Divider = ({orientation, ...props}) => {
    const Component = orientation === 'horizontal' ?
        HorizontalDivider : VerticalDivider;
    return (
        <Component {...props}/>
    )
};

Divider.defaultProps = {
    orientation: 'horizontal',
    thickness: 1,
    color: '#000'
};

Divider.propTypes = {
    color: PropTypes.string,
    thickness: PropTypes.number.isRequired,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
};

export default Divider;