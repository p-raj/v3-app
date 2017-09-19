import React from 'react';
import PropTypes from 'prop-types';
import { Image as RNImage, TouchableOpacity } from 'react-native';


class Image extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <RNImage {...this.props}/>
            </TouchableOpacity>
        )
    }
}

Image.propTypes = {
    ...RNImage.propTypes,
    onPress: PropTypes.func
};

export default Image;
