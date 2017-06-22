/**
 * Home Screen decides the layout of the components like
 * MembershipBar & RuntimeContainer.
 *
 * Lifting the state up, things have changed since
 * the last time this file created:
 * MembershipBar was supposed to hide when logged in a terminal.
 * No longer the case, we don't have any special case.
 * Every membership has Runtime associated with it.
 * Terminal - a type of membership now.
 *
 * Now, we need to show a Component showing,
 * no memberships assigned.
 * The current implementation will show this in 2 splits:
 * No memberships & no runtimes. :(
 *
 * */
import React  from 'react';
import RN, { Image, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../common/theme'


const styles = RN.StyleSheet.create({
    iconContainer: {
        height: 95,
        width: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconShape: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

        // backgroundColor: theme.flatColorShades[Math.floor((Math.random() * 10) + 1)]

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
            <View style={styles.iconContainer}>
                <TouchableHighlight
                    style={[styles.iconShape, {
                        width: this.props.iconSize || 60,
                        height: this.props.iconSize || 60,
                        backgroundColor: this.props.showImage ? 'white' : '#333'
                    }]}
                    onPress={this.props.onIconPress}>
                    {this.props.showImage ?
                        <Image source={{uri: this.props.imageUrl}}
                               width={75}
                               height={75}
                               style={{width: 75, height: 75, backgroundColor: 'white', alignSelf: 'center'}}
                               resizeMethod={'contain'}/> :
                        <Icon name={this.props.iconLogo} size={32}
                              style={styles.icon}/>}
                </TouchableHighlight>
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
