import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from '../../components/ui-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../utils/theme'
import { moderateScale } from '../../utils/responsiveGuidelines';


const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(80, 0.05),
        height: moderateScale(90, 0.05),
    },
    iconShape: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: moderateScale(70, 0.05),
        height: moderateScale(70, 0.05),
        backgroundColor: '#333'
    },
    icon: {
        color: theme.iconColor,
        backgroundColor: "transparent",
        margin: 0,
        padding: 0
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


class IconComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.iconContainer, {...this.props.iconContainerStyle}]}>
                <TouchableOpacity
                    style={styles.iconShape}
                    onPress={this.props.onIconPress}>
                    <Icon name={this.props.iconLogo} size={moderateScale(32, 0.3)} color={theme.white}/>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.iconText}>{this.props.iconText}</Text>
            </View>
        )
    };
}

IconComponent.propTypes = {
    iconText: React.PropTypes.string.isRequired,
    onIconPress: React.PropTypes.func.isRequired,
};


export default IconComponent;
