import React  from 'react';
import RN, { Image, Text, TouchableHighlight, View } from 'react-native';
import theme from '../../utils/theme'
import PropTypes from 'prop-types';


const styles = RN.StyleSheet.create({
    iconContainer: {
        width: 80,
        height: 90,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 10,
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    iconText: {
        color: theme.black,
        flex: 1,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: theme.h6,
        paddingTop: theme.paddingMinimal
    }
});


class ImageIconComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.iconContainer}>
                <TouchableHighlight onPress={this.props.onIconPress}>
                    <Image source={{uri: this.props.imageUrl}}
                           style={styles.image}
                           resizeMethod={'contain'}/>
                </TouchableHighlight>
                <Text numberOfLines={1} style={styles.iconText}>{this.props.iconText}</Text>
            </View>
        )
    };
}

ImageIconComponent.propTypes = {
    iconText: React.PropTypes.string.isRequired,
    imageUrl: React.PropTypes.string.isRequired,
    onIconPress: React.PropTypes.func.isRequired,
};


export default ImageIconComponent;
