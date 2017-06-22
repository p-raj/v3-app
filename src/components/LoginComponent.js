import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Label, Spinner } from 're-render';
import _ from 'lodash';
import RequestProcess from '../utils/RequestProcess';
import Request from 're-quests'

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    textInput: {
        height: 40,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'black'
    },
});

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        // Don't set to undefined by default instead use empty string.
        // http://stackoverflow.com/a/38015169/5463404
        this.state = {
            email: '',
            password: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    autoCapitalize={"none"}
                    onChangeText={this.onEmailChange}
                    value={this.state.email}/>
                {this.state.buttonPressed && !this.state.email &&
                <Label value="This is a required field" style={{color: 'red'}}/>}
                <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                    onChangeText={this.onPasswordChange}
                    value={this.state.password}/>
                {this.state.buttonPressed && !this.state.password &&
                <Label value="This is a required field" style={{color: 'red'}}/>}
                {this.state.buttonPressed && this.state.wrongCredentials &&
                <Label value="Incorrect email or password." style={{color: 'red'}}/>}
                <RequestProcess
                    name='login'
                    ref={(request) => {
                        this.loginUser = request;
                    }}
                    onError={(response) => {
                        //re-quests does not return status code as of now, so this is the default case
                        this.setState({wrongCredentials: true})
                    }}
                    onFaliure={(response) => {
                    }}
                    defer={true}
                    data={{
                        email: this.state.email,
                        password: this.state.password,
                        __encoding: 'application/json'
                    }}
                    onSuccess={(response) => this.props.onAuthSuccessful(response.data)}>
                    <View style={{width: '100%'}}>
                        <Request.RenderIf stateIn={[0, 2, 4]}>
                            <Button
                                style={{marginVertical: 10}}
                                title="Login"
                                onPress={this.onLoginClicked}/>
                        </Request.RenderIf>
                        <Request.Start>
                            <Spinner style={{alignSelf: 'center'}}/>
                        </Request.Start>
                        <Request.Error>
                            <Label value="Error in Logging you in." style={{color: 'red'}}/>
                        </Request.Error>
                    </View>
                </RequestProcess>
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

    onLoginClicked = () => {
        this.setState({buttonPressed: true});
        if (this.state.email && this.state.password) {
            this.loginUser.getWrappedInstance().fire();
        }
    }
}


export default LoginComponent;