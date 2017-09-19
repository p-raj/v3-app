import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet, Image } from '../../components/ui-components';
import theme from '../../utils/theme'
import { moderateScale } from '../../utils/responsiveGuidelines';


const styles = StyleSheet.create({
    iconContainer: {
        width: moderateScale(80, 0.3),
        height: moderateScale(90, 0.3),
    },
    image: {
        borderRadius: moderateScale(10, 0.3),
        alignSelf: 'center'
    },
    iconText: {
        flex: 1,
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
                        source={this.props.imageUrl}
                        style={styles.image}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.iconText}>{this.props.iconText}</Text>
            </View>
        )
    };
}

ImageIconComponent.propTypes = {
    iconText: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onIconPress: PropTypes.func.isRequired,
};


export default ImageIconComponent;
