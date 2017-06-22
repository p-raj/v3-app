import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authSuccess } from '../redux/actions/auth';
import { Spinner } from 're-render';
import _ from 'lodash';
import RequestProcess from '../utils/RequestProcess';
import Request from 're-quests'
import theme from '../common/theme'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30
    },
    texInputWrapper: {
        borderBottomWidth: 1,
        borderColor: theme.black,
        width: '100%',
        marginBottom: 10,
    },
    textInput: {
        height: 50,
        fontSize: 22,
        borderWidth: 0,
        color: theme.black,
    },
    buttonText: {
        alignSelf: 'center',
        color: theme.black,
        backgroundColor: 'transparent',
        padding: 10,
        fontSize: theme.h4
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: theme.errorMessageColor
    }

});

class AuthScreen extends React.Component {
    constructor(props) {
        super(props);

        // Don't set to undefined by default instead use empty string.
        // http://stackoverflow.com/a/38015169/5463404
        this.state = {
            showLogin: true
        };
        this.onAuthSuccessful = this.onAuthSuccessful.bind(this);
    }

    onAuthSuccessful(data) {
        this.setState({buttonPressed: false});
        this.props.dispatch(authSuccess(data));
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={{padding: '10%', paddingTop: "20%"}}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            resizeMode={'contain'}
                            style={styles.logo}
                        />
                        <Text style={{
                            backgroundColor: 'transparent',
                            fontSize: 36,
                            marginBottom: 10,
                            textAlign: 'left',
                            color: theme.black
                        }}>
                            Welcome
                        </Text>
                        <Text style={{backgroundColor: 'transparent', fontSize: 20, color: theme.black}}>
                            {"Discover amazing apps, "}
                        </Text>
                        <Text style={{
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            marginBottom: 10,
                            color: theme.black
                        }}>
                            {"specially crafted for your taste. "}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingHorizontal: '10%',
                        paddingTop: '10%',
                    }}>
                        <View style={styles.texInputWrapper}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={"#b2b2b2"}
                                style={styles.textInput}
                                autoCapitalize={"none"}
                                autoComplete={false}
                                underlineColorAndroid={"transparent"}
                                keyboardType="email-address"
                                autoFocus={true}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={this.onEmailChange}
                                value={this.state.email}/>
                        </View>

                        {this.state.buttonPressed && !this.state.email &&
                        <Text style={styles.error}>
                            Email is a required field
                        </Text>}
                        <View style={styles.texInputWrapper}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={"#b2b2b2"}
                                style={styles.textInput}
                                underlineColorAndroid={"transparent"}
                                autoComplete={false}
                                secureTextEntry={true}
                                keyboardType="default"
                                enablesReturnKeyAutomatically={true}
                                autoCapitalize={"none"}
                                onChangeText={this.onPasswordChange}
                                value={this.state.password}/>
                        </View>
                        {this.state.buttonPressed && !this.state.password &&
                        <Text style={styles.error}>
                            Password is a required field"
                        </Text>}
                        {this.state.buttonPressed && this.state.wrongCredentials &&
                        <Text style={styles.error}>
                            Incorrect email or password.
                        </Text>}
                        { this.state.backendErrorMessage &&
                        <Text style={styles.error}>
                            {this.state.backendErrorMessage.toString()}
                        </Text>}
                    </View>
                    <View style={{flex: 1,justifyContent: 'flex-end'}}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: 50,
                            borderWidth: 1,
                            borderColor: theme.lightBlack,
                        }}>
                            <RequestProcess
                                name={'login'}
                                ref={(request) => {
                                    this.login = request;
                                }}
                                defer={true}
                                data={{
                                    email: this.state.email,
                                    password: this.state.password
                                }}
                                onError={(response) => this.setState({
                                    buttonPressed: false,
                                    backendErrorMessage: response
                                })}
                                onSuccess={(response) => this.onAuthSuccessful(response.data)}>
                                <View style={{
                                    width: '50%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Request.RenderIf stateIn={[0, 2, 4]}>
                                        <TouchableOpacity
                                            style={[styles.buttonContainer]}
                                            onPress={this.onLoginClicked}>
                                            <Text style={styles.buttonText}>
                                                Login
                                            </Text>
                                        </TouchableOpacity>
                                    </Request.RenderIf>
                                    <Request.Start>
                                        <Spinner style={{alignSelf: 'center'}}/>
                                    </Request.Start>
                                </View>
                            </RequestProcess>
                            <View style={{
                                width: 1,
                                height: '80%',
                                backgroundColor: theme.lightBlack,
                                alignSelf: 'center'
                            }}/>
                            <RequestProcess
                                name={'wf__register'}
                                ref={(request) => {
                                    this.signup = request;
                                }}
                                defer={true}
                                data={{
                                    'input.body': {
                                        email:this.state.email,
                                        password:this.state.password
                                    }
                                }}
                                onError={(response) => this.setState({
                                    buttonPressed: false,
                                    backendErrorMessage: response
                                })}
                                onSuccess={(response) => this.onAuthSuccessful(response.data)}>
                                <View style={{
                                    width: '50%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Request.RenderIf stateIn={[0, 2, 4]}>
                                        <TouchableOpacity
                                            style={[styles.buttonContainer]}
                                            onPress={this.onSignUpClicked}>
                                            <Text style={styles.buttonText}>
                                                Sign-Up
                                            </Text>
                                        </TouchableOpacity>
                                    </Request.RenderIf>
                                    <Request.Start>
                                        <Spinner style={{alignSelf: 'center'}}/>
                                    </Request.Start>
                                </View>
                            </RequestProcess>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    onLoginClicked = () => {
        this.setState({buttonPressed: true});
        if (this.state.email && this.state.password) {
            this.login.getWrappedInstance().fire();
        }
    };
    onSignUpClicked = () => {
        this.setState({buttonPressed: true});
        if (this.state.email && this.state.password) {
            this.signup.getWrappedInstance().fire();
        }
    };

    onEmailChange = (email) => {
        this.setState({
            email: _.trim(email)
        });
    };

    onPasswordChange = (password) => {
        this.setState({
            password: _.trim(password)
        });
    };
}


export default AuthScreen;