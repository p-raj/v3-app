import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import theme from '../../utils/theme'
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: theme.extraLightBlack,
        marginVertical: 10,
    },
    text: {
        alignSelf: 'center',
        color: theme.black,
        backgroundColor: 'transparent',
        margin: 10,
        fontWeight: "500",
        fontSize: theme.h4,
        flex: 1,
        textAlign:'center'
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initiated: false,
            closeSession: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onBackClicked}>
                    <Icon name="chevron-left" color="black" size={theme.h3}/>
                </TouchableOpacity>
                <Text style={styles.text}
                      numberOfLines={1}>
                    {this.props.appName || "Application Name"}
                </Text>
                <TouchableOpacity onPress={this.props.onCloseClicked}>
                    <Icon name="home" color="black" size={theme.h3}/>
                </TouchableOpacity>
            </View>
        );
    }

}

export default NavBarComponent;
