import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { authSuccess } from '../../redux/actions/auth';
import _ from 'lodash';
import theme from '../../utils/theme'
import SignupComponent from './SignupComponent';
import LoginComponent from './LoginComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '10%',
    },
    logo: {
        flex: 1,
        alignSelf: 'flex-start',
        width: 140,
        height: 140
    },
    texInputWrapper: {
        borderBottomWidth: 1,
        borderColor: theme.black,
        width: '100%',
        marginBottom: 10,
    },
    textInput: {
        height: 40,
        fontSize: 20,
        borderWidth: 0,
        color: theme.black,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        justifyContent: 'space-between',
        marginVertical: 20
    },
    error: {
        color: theme.errorMessageColor
    },
    divider: {
        width: 0.7,
        height: '80%',
        backgroundColor: theme.lightBlack,
        alignSelf: 'center'
    },
    welcome: {
        backgroundColor: 'transparent',
        fontSize: 36,
        color: theme.black
    },
    button: {
        width: "45%",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.lightBlack
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
                <View style={{flex: 4}}>
                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                        <View style={{flex: 1, alignItems:'flex-start'}}>
                            <Image
                                source={require('../../assets/images/EkkaLogo.png')}
                                resizeMode={'contain'}
                                style={styles.logo}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.welcome}>
                                EKKA
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    backgroundColor: 'transparent',
                                    fontSize: 13,
                                    color: theme.black
                                }}>
                                World is your wokplace
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Text style={{backgroundColor: 'transparent', fontSize: 20, marginTop: 10, color: theme.black}}>
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
                </View>

                <View style={{flex: 6}}>
                    <View style={styles.texInputWrapper}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={"#b2b2b2"}
                            style={styles.textInput}
                            autoCapitalize={"none"}
                            autoComplete={"false"}
                            autoCorrect={false}
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
                            autoCorrect={false}
                            underlineColorAndroid={"transparent"}
                            autoComplete={"false"}
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
                    {this.state.backendErrorMessage &&
                    <Text style={styles.error}>
                        {this.state.backendErrorMessage.toString()}
                    </Text>}
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <LoginComponent
                                email={this.state.email}
                                password={this.state.password}
                                onAuthSuccessful={this.onAuthSuccessful}/>
                        </View>
                        {/*<View style={styles.divider}/>*/}
                        <View style={styles.button}>
                            <SignupComponent
                                email={this.state.email}
                                password={this.state.password}
                                onAuthSuccessful={this.onAuthSuccessful}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


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