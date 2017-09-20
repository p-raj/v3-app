/**

 * */
import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { View } from 'components';
import { withAuthentication } from '../components/hoc/Auth';
import AppSelector from './screen-components/AppSelector';
import ProfileScreen from './screen-components/ProfileScreen';
import BlurView from 'components/BlurView'
import SettingsScreen from './screen-components/SettingsScreen';
import MarketplaceScreen from './screen-components/MarketplaceScreen';
import theme from '../utils/theme'
import IconComponent from '../components/ui-components/VectorIconComponent';
import ToastComponent from '../components/ui-components/ToastComponent';

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
        justifyContent: 'space-around',
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
        this.toast = undefined;
        this.state = {
            selectedIcon: 'home',
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <ToastComponent ref={(self) => this.toast = self}
                                styleBoard={{backgroundColor: theme.black, borderRadius: 10}}
                                positionFromTop={0.9}
                                styleText={{
                                    fontSize: 16,
                                    color: theme.extraLightWhite
                                }}/>
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
                    <IconComponent iconLogo={'shopping-bag'} iconText={'Marketplace'}
                                   onIconPress={() => {
                                       this.setState({selectedIcon: 'marketplace'})
                                   }}/>
                    <IconComponent iconLogo={'user'} iconText={'Profile'}
                                   onIconPress={() => {
                                       this.setState({selectedIcon: 'profile'})
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
