import React  from 'react';
import RN, { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../utils/theme'


const styles = RN.StyleSheet.create({
    iconContainer: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconShape: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
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
                    <Icon name={this.props.iconLogo} size={32} color={theme.white}/>
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
