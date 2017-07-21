import React from 'react';
import {
    StyleSheet, View, Image, ActivityIndicator, Text, TextInput, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import theme from '../../utils/theme'
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import Request from 're-quests';
import ImagePicker from '../../v3-core/components/ui/ImagePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateAuth } from '../../redux/actions/auth';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '10%',
    },
    textInput: {
        color: theme.black,
        height: 40,
        fontSize: 16,
        flex: 1,
    },
    texInputWrapper: {
        flexDirection: "row",
        alignItems: 'center',
    },
    image: {
        borderRadius: 45,
        height: 90,
        width: 90,
        marginBottom: 20,
        marginRight: 20
    },
    icon: {
        fontSize: 22,
        margin: 0,
        padding: 0,
    },
    textInputContainer: {
        flex: 8.5,
        borderBottomWidth: 1,
        borderColor: theme.black
    },
    buttonContainer: {
        borderColor: theme.black,
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class ProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    profileUpdated = (response) => {
        this.props.dispatch(updateAuth(response.data))
        // this.toast.show("This is a toast");
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 2}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            source={this.props.auth.avatar_thumbnail ?
                                {uri: `${this.props.auth.avatar_thumbnail}`} :
                                require('../../assets/images/EkkaLogo.png')}
                            style={styles.image}/>
                        <ImagePicker launchType={"gallery"}/>
                    </View>
                </View>
                <View style={{flex: 8, justifyContent: 'space-around'}}>
                    <View style={styles.texInputWrapper}>
                        <View style={{flex: 1.5}}>
                            <Icon name="user" style={styles.icon}/>
                        </View>
                        <View style={styles.textInputContainer}>
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
                    </View>
                    <View style={styles.texInputWrapper}>
                        <View style={{flex: 1.5}}>
                            <Icon name="phone" style={styles.icon}/>
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                placeholder={"Phone"}
                                selectionColor={theme.black}
                                placeholderTextColor={theme.extraLightBlack}
                                value={this.state.phone}
                                autoCapitalize={"none"}
                                autoComplete={false}
                                enablesReturnKeyAutomatically={true}
                                keyboardType="phone-pad"
                                onChangeText={(phone) => this.setState({phone})}
                                style={styles.textInput}/>
                        </View>
                    </View>
                    <View style={styles.texInputWrapper}>
                        <View style={{flex: 1.5}}>
                            <Icon name="envelope" style={styles.icon}/>
                        </View>
                        <View style={styles.textInputContainer}>
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
                    </View>
                    <View style={styles.texInputWrapper}>
                        <View style={{flex: 1.5}}>
                            <Icon name="unlock" style={styles.icon}/>
                        </View>
                        <View style={styles.textInputContainer}>

                            <TextInput
                                keyboardType="default"
                                autoCapitalize={"none"}
                                autoComplete={false}
                                enablesReturnKeyAutomatically={true}
                                placeholder={"Current Password"}
                                secureTextEntry={true}
                                placeholderTextColor={theme.extraLightBlack}
                                onChangeText={(currentPassword) => this.setState({currentPassword})}
                                value={this.state.currentPassword} style={styles.textInput}/>
                        </View>
                    </View>
                    <View style={styles.texInputWrapper}>
                        <View style={{flex: 1.5}}>

                            <Icon name="unlock-alt" style={styles.icon}/>
                        </View>
                        <View style={styles.textInputContainer}>

                            <TextInput
                                keyboardType="default"
                                autoCapitalize={"none"}
                                autoComplete={false}
                                enablesReturnKeyAutomatically={true}
                                placeholder={"New Password"}
                                secureTextEntry={true}
                                placeholderTextColor={theme.extraLightBlack}
                                onChangeText={(newPassword) => this.setState({newPassword})}
                                value={this.state.newPassword || ""} style={styles.textInput}/>
                        </View>
                    </View>
                    <View style={styles.texInputWrapper}>
                        <View style={{flex: 1.5}}>
                            <Icon name="lock" style={styles.icon}/>
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                keyboardType="default"
                                autoCapitalize={"none"}
                                autoComplete={false}
                                enablesReturnKeyAutomatically={true}
                                placeholder={"Confirm New Password"}
                                secureTextEntry={true}
                                placeholderTextColor={theme.extraLightBlack}
                                onChangeText={(confirmNewPassword) => this.setState({confirmNewPassword})}
                                value={this.state.confirmNewPassword} style={styles.textInput}/>
                        </View>
                    </View>
                    <RequestProcess
                        name={'update_user_profile'}
                        defer={true}
                        ref={(request) => {
                            this.updateProfile = request;
                        }}
                        data={{uuid: this.props.auth.uuid, name: this.state.name}}
                        onSuccess={this.profileUpdated}>
                        <View style={styles.buttonContainer}>
                            <Request.RenderIf stateIn={[0, 2, 4]}>
                                <TouchableOpacity
                                    style={{flex: 1, justifyContent: "center", alignItems: 'center'}}
                                    onPress={() => {
                                        this.updateProfile.getWrappedInstance().fire();
                                    }}>
                                    <Text style={{fontSize: 20, color: theme.black}}>
                                        Update Profile
                                    </Text>
                                </TouchableOpacity>
                            </Request.RenderIf>
                            <Request.Start>
                                <ActivityIndicator size={'large'} color={theme.black}/>
                            </Request.Start>
                        </View>
                    </RequestProcess>
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.setState({
            ...this.props.auth
        });
    }
}

ProfileComponent = connect((store) => {
    return {
        auth: store.auth
    }
})(ProfileComponent);

export default ProfileComponent;

