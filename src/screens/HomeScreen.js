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
import React from 'react';
import { StyleSheet }  from 'react-native';
import { connect } from 'react-redux';
import View from '../v3-core/components/ui/View';
import { withAuthentication } from '../v3-core/components/hoc/Auth';
import AppSelector from './sub-screens/AppSelector';
import ProfileScreen from './sub-screens/ProfileScreen';
import  BlurView from '../v3-core/components/ui/BlurView'
import SettingsScreen from './sub-screens/SettingsScreen';
import MarketplaceScreen from './sub-screens/MarketplaceScreen';
import theme from '../utils/theme'
import IconComponent from '../components/ui-components/IconComponent';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: theme.white
    },
    mainArea: {
        width: '100%',
        height: '85%',
    },
    dock: {
        width: '100%',
        height: '15%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0.16,
        borderColor: 'grey',
        shadowColor: 'black',
        shadowOffset: {
            width: 1, height: 1
        },
        shadowOpacity: 0.2,
    },
    iconBox: {
        flex: 1,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontSize: theme.h4,
        fontWeight: '400',
        color: '#333',
        backgroundColor: 'transparent'
    },
});


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIcon: 'home',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainArea}>
                    {this.state.selectedIcon === 'home' &&
                    <AppSelector/>}
                    {this.state.selectedIcon === 'marketplace' &&
                    <MarketplaceScreen/>}
                    {this.state.selectedIcon === 'profile' &&
                    <ProfileScreen/>}
                    {this.state.selectedIcon === 'settings' &&
                    <SettingsScreen/>}
                </View>
                <BlurView
                    style={styles.dock}
                    blurType="light"
                    blurAmount={100}>
                    <View style={styles.iconBox}>
                        <IconComponent iconLogo={'home'} iconText={'Home'}
                                       onIconPress={() => {
                                           this.setState({selectedIcon: 'home'})
                                       }}/>
                    </View>
                    <View style={styles.iconBox}>
                        <IconComponent iconLogo={'user'} iconText={'Profile'}
                                       onIconPress={() => {
                                           this.setState({selectedIcon: 'profile'})
                                       }}/>
                    </View>
                    <View style={styles.iconBox}>
                        <IconComponent iconLogo={'play'} iconText={'Marketplace'}
                                       onIconPress={() => {
                                           this.setState({selectedIcon: 'marketplace'})
                                       }}/>
                    </View>
                    <View style={styles.iconBox}>
                        <IconComponent iconLogo={'cog'} iconText={'Settings'}
                                       onIconPress={() => {
                                           this.setState({selectedIcon: 'settings'})
                                       }}/>
                    </View>
                </BlurView>
            </View>
        )
    };


}


HomeScreen = connect((state) => {
    return {
        auth: state.auth,
        membership: state.memberships.selected,
        memberships: state.memberships.results || []
    }
})(HomeScreen);

export default withAuthentication(HomeScreen);
