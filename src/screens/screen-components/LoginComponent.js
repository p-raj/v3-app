import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import Request from 're-quests'
import theme from '../../utils/theme'
import ToastComponent from '../../components/ui-components/ToastComponent';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showError = (statusCode, responseObject) => {
        this.toast.show('Invalid username or password', 2000, 2000);
    };

    render() {
        return (
            <View style={styles.container}>
                <RequestProcess
                    name={'login'}
                    ref={(request) => {
                        this.login = request;
                    }}
                    defer={true}
                    data={{
                        email: this.props.email,
                        password: this.props.password
                    }}
                    onError={(response) => {
                        this.setState({
                            buttonPressed: false,
                        });
                        this.showError(response.response.status === 401, response.response)
                    }}

                    onSuccess={(response) => this.props.onAuthSuccessful(response.data)}>
                    <View style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
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
                            <ActivityIndicator style={{alignSelf: 'center'}} color={'black'}/>
                        </Request.Start>
                    </View>
                </RequestProcess>
            </View>
        )
    }

    onLoginClicked = () => {
        this.setState({buttonPressed: true});
        if (this.props.email && this.props.password) {
            this.login.getWrappedInstance().fire();
        }
    };
}


export default LoginComponent;