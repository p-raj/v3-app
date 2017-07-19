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
        borderBottomWidth: 1,
        borderColor: theme.extraLightBlack,
        padding: 10,
        marginBottom: 20
    },
    text: {
        alignSelf: 'center',
        color: theme.black,
        backgroundColor: 'transparent',
        padding: 10,
        fontWeight:"500",
        fontSize: theme.h4
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
                <Text style={styles.text}>
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
