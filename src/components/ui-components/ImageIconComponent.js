import React from 'react';
import RN, { Image, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../utils/theme'
import * as _ from 'lodash';


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
                <TouchableOpacity onPress={this.props.onIconPress}>
                    <Image
                        source={{uri: _.isEmpty(this.props.imageUrl) ? "http://via.placeholder.com/65x65" : this.props.imageUrl}}
                        style={styles.image}/>
                </TouchableOpacity>
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
