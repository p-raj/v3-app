import React from 'react';
import { Image, StyleSheet } from 'react-native';
import theme from '../../utils/theme'

const styles = StyleSheet.create({
    image: {
        alignSelf: 'flex-start',
        width: theme.defaultImageSize,
        height: theme.defaultImageSize,
        backgroundColor: 'transparent',
    }

});

export default class ImageComponent extends React.Component {
    render() {
        return (
            <Image
                source={{uri: this.props.source}}
                resizeMode={this.props.resizeMode || 'contain'}
                style={[styles.image, this.props.style]}
            />
        )
    }
}
