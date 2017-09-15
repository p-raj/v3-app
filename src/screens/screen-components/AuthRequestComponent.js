import React from 'react';
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Request from 're-quests'
import * as _ from 'lodash';
import isEmail from 'validator/lib/isEmail';
import Button from '../../components/ui-components/Button'

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});

class AuthRequestComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <View style={styles.container}>
                <RequestProcess
                    name={this.props.systemProcessName}
                    ref={(request) => {
                        this.login = request;
                    }}
                    defer={true}
                    data={{
                        email: this.props.email,
                        password: this.props.password
                    }}
                    onError={(response) => this.props.onAuthFailed(response)}
                    onSuccess={(response) => this.props.onAuthSuccessful(response.data)}>
                    <View style={styles.innerContainer}>
                        <Request.RenderIf stateIn={[0, 2, 4]}>
                            <Button
                                onPress={this.onButtonClicked}
                                title={this.props.buttonText}/>
                        </Request.RenderIf>
                        <Request.Start>
                            <ActivityIndicator style={{alignSelf: 'center'}} color={'black'}/>
                        </Request.Start>
                    </View>
                </RequestProcess>
            </View>
        )
    }

    onButtonClicked = () => {
        //check for empty email or password
        if (_.isEmpty(this.props.email) || _.isEmpty(this.props.password)) {
            this.props.onAuthFailed({message: "Email or password cannot be empty."});
            return;
        }
        //check for a valid email
        if (!isEmail(this.props.email)) {
            this.props.onAuthFailed({message: "This is not a valid email address."});
            return;
        }

        this.login.getWrappedInstance().fire();
    };

}


AuthRequestComponent.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    systemProcessName: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onAuthSuccessful: PropTypes.func.isRequired,
    onAuthFailed: PropTypes.func.isRequired,

};

export default AuthRequestComponent;