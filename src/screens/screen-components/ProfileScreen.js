import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text, Platform, Dimensions } from 'react-native';
import { Button, TextInput } from '../../v3-core/re-render';
import { connect } from 'react-redux';
import { withAuthentication } from '../../v3-core/components/hoc/Auth';
import theme from '../../utils/theme'
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import Request from 're-quests';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: '10%',
    },
    textInput: {
        color: theme.black,
        height: 50,
        fontSize: 22,
        borderWidth: 0,
        width: '100%'
    },
    texInputWrapper: {
        borderBottomWidth: 1,
        borderColor: theme.black,
        minWidth: '80%',
        marginBottom: 10,
    },
});
const {height} = Dimensions.get('window');

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: this.props.auth.avatar_thumbnail}}
                    style={{
                        borderRadius: 45,
                        backgroundColor: theme.black,
                        height: 90,
                        width: 90,
                        marginBottom: 20,
                        marginTop: 40
                    }}/>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.texInputWrapper}>
                        <TextInput
                            placeholder={"Name"}
                            selectionColor={theme.black}
                            placeholderTextColor={theme.extraLightBlack}
                            value={this.state.name}
                            autoCapitalize={"none"}
                            autoComplete={false}
                            enablesReturnKeyAutomatically={true}
                            keyboardType="default"
                            onChangeText={(name) => this.setState({name})}
                            style={styles.textInput}/>
                    </View>
                    <View style={styles.texInputWrapper}>
                        <TextInput
                            keyboardType="email-address"
                            autoCapitalize={"none"}
                            editable={false}
                            autoComplete={false}
                            enablesReturnKeyAutomatically={true}
                            placeholder={"Email"}
                            placeholderTextColor={theme.extraLightBlack}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            style={styles.textInput}/>
                    </View>
                    <View style={styles.texInputWrapper}>
                        <TextInput
                            keyboardType="default"
                            autoCapitalize={"none"}
                            autoComplete={false}
                            enablesReturnKeyAutomatically={true}
                            placeholder={"Current Password"}
                            secureTextEntry={true}
                            placeholderTextColor={theme.extraLightBlack}
                            onChangeText={(currentPassword) => this.setState({currentPassword})}
                            value={ this.state.currentPassword} style={styles.textInput}/>
                    </View>
                    <View style={styles.texInputWrapper}>
                        <TextInput
                            keyboardType="default"
                            autoCapitalize={"none"}
                            autoComplete={false}
                            enablesReturnKeyAutomatically={true}
                            placeholder={"New Password"}
                            secureTextEntry={true}
                            placeholderTextColor={theme.extraLightBlack}
                            onChangeText={(newPassword) => this.setState({newPassword})}
                            value={ this.state.newPassword || ""} style={styles.textInput}/>
                    </View>
                    <View style={styles.texInputWrapper}>
                        <TextInput
                            keyboardType="default"
                            autoCapitalize={"none"}
                            autoComplete={false}
                            enablesReturnKeyAutomatically={true}
                            placeholder={"Confirm Password"}
                            secureTextEntry={true}
                            placeholderTextColor={theme.extraLightBlack}
                            onChangeText={(confirmNewPassword) => this.setState({confirmNewPassword})}
                            value={ this.state.confirmNewPassword} style={styles.textInput}/>
                    </View>
                </View>
                <View style={{marginVertical: 10, borderColor: theme.black, borderWidth: 1, minWidth: '80%',}}>
                    <Button style={{backgroundColor: "transparent", color: theme.black}} onPress={() => {
                        this.updateProfile.getWrappedInstance().fire();
                    }} title="Update Profile"/>
                </View>
                <RequestProcess
                    name={'update_user_profile'}
                    defer={true}
                    ref={(request) => {
                        this.updateProfile = request;
                    }}
                    data={{uuid: this.props.auth.uuid, name: this.state.name}}
                    >
                    <View style={styles.container}>
                        <Request.Start>
                            <View
                                style={{
                                    flex: 1, justifyContent: 'center', alignItems: 'center', ...Platform.select({
                                        web: {
                                            minHeight: height,
                                        }
                                    })
                                }}>
                                <ActivityIndicator size={'large'} color={theme.black}/>
                                <Text style={styles.loadingText}>Fetching Memberships</Text>
                            </View>
                        </Request.Start>
                    </View>
                </RequestProcess>

            </View>
        )
    }

    componentDidMount() {
        this.setState({
            name: this.props.auth.name,
            email: this.props.auth.email,
        })
    }
}

ProfileScreen = connect((store) => {
    return {
        auth: store.auth
    }
})(ProfileScreen);

export default withAuthentication(ProfileScreen);

