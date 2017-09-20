import React from 'react';
import { StyleSheet, View, Dimensions, } from 'react-native';
import { connect } from 'react-redux';
import { withAuthentication } from 'shell/components/hoc/Auth';
import BlurView from 'components/BlurView';
import IconComponent from '../../components/ui-components/VectorIconComponent';
import { logout } from '../../redux/actions/auth';

const {height, width} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '10%',
        minHeight: height * 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        height: 85,
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    iconShape: {
        height: 60,
        width: 60,
        borderRadius: 12,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0.5, height: 1
        },
        shadowOpacity: .3,
        alignSelf: 'center'
    },
    gradientContainer: {
        height: 60,
        width: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: 'white',
        backgroundColor: "transparent",
        margin: 0,
        padding: 0
    },
    iconName: {
        color: 'white',
        flex: 1,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
        fontWeight: '500'
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '400',
        color: 'white',
        backgroundColor: 'transparent'
    },
});

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: {width, height}
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <BlurView style={{borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}
                              blurType="light"
                              blurAmount={12}>
                        <View style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <View style={{margin: 12}}>
                                <IconComponent iconLogo={'star'} iconText={'Rate Us'}
                                               onIconPress={() => {
                                                   this.setState({selectedIcon: 'star'})
                                               }}/>
                            </View>
                            <View style={{margin: 12}}>
                                <IconComponent iconLogo={'paint-brush'} iconText={'Theme'}
                                               onIconPress={() => {
                                                   this.setState({selectedIcon: 'theme'})
                                               }}/>
                            </View>
                            <View style={{margin: 12}}>
                                <IconComponent iconLogo={'trash'} iconText={'Delete Account'}
                                               onIconPress={() => {
                                                   this.setState({selectedIcon: 'delete'})
                                               }}/>
                            </View>
                        </View>
                        <View style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <View style={{margin: 12}}>
                                <IconComponent iconLogo={'envelope'} iconText={'Notifications'}
                                               onIconPress={() => {
                                                   this.setState({selectedIcon: 'notification'})
                                               }}/>
                            </View>
                            <View style={{margin: 12}}>
                                <IconComponent iconLogo={'phone'} iconText={'Contact Us'}
                                               onIconPress={() => {
                                                   this.setState({selectedIcon: 'contact'})
                                               }}/>
                            </View>
                            <View style={{margin: 12}}>
                                <IconComponent iconLogo={'power-off'} iconText={'Logout'}
                                               onIconPress={() => {
                                                   this.setState({selectedIcon: 'logout'});
                                                   this.props.dispatch(logout());
                                               }}/>
                            </View>
                        </View>
                    </BlurView>
                </View>
            </View>
        )
    }

}

SettingsScreen = connect((store) => {
    return {
        // to prevent the unnecessary null checks
        auth: store.auth
    }
})(SettingsScreen);

export default withAuthentication(SettingsScreen);

