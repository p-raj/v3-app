import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import Request from 're-quests'
import theme from '../../utils/theme'

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

class SignupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>

                <RequestProcess
                    name={'wf__register'}
                    ref={(request) => {
                        this.signup = request;
                    }}
                    defer={true}
                    data={{
                        'input.body': {
                            email: this.props.email,
                            password: this.props.password
                        }
                    }}
                    onError={(response) => this.setState({
                        buttonPressed: false,
                        backendErrorMessage: response
                    })}
                    onSuccess={(response) => this.props.onAuthSuccessful(response.data)}>
                    <View style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
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
                            <ActivityIndicator style={{alignSelf: 'center'}} color={'black'}/>
                        </Request.Start>
                    </View>
                </RequestProcess>
            </View>
        )
    }

    onSignUpClicked = () => {
        this.setState({buttonPressed: true});
        if (this.props.email && this.props.password) {
            this.signup.getWrappedInstance().fire();
        }
    };
}


export default SignupComponent;