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
        justifyContent: 'space-between'
    },
    mainArea: {
        flex: 8.5,
    },
    dock: {
        flex: 1.5,
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#e2e2e2',
        shadowColor: 'black',
        shadowOffset: {
            width: 1, height: 1
        },
        shadowOpacity: 0.2,
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
                    <View style={{flex: 1}}>
                        <AppSelector/>
                    </View>}
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
                    <IconComponent iconLogo={'home'} iconText={'Home'}
                                   onIconPress={() => {
                                       this.setState({selectedIcon: 'home'})
                                   }}/>
                    <IconComponent iconLogo={'user'} iconText={'Profile'}
                                   onIconPress={() => {
                                       this.setState({selectedIcon: 'profile'})
                                   }}/>
                    <IconComponent iconLogo={'play'} iconText={'Marketplace'}
                                   onIconPress={() => {
                                       this.setState({selectedIcon: 'marketplace'})
                                   }}/>
                    <IconComponent iconLogo={'cog'} iconText={'Settings'}
                                   onIconPress={() => {
                                       this.setState({selectedIcon: 'settings'})
                                   }}/>
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
