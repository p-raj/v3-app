import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import _ from 'lodash';
import { Button, Label, Spinner } from 're-render';
import HorizontalLayout from '../v3-core/components/layouts/HorizontalLayout/index';
import ImagePicker from '../../a../v3-core/components/ui/ImagePicker';
import Request from 're-quests';
import RequestProcess from '../utils/RequestProcess';
import { emailValidation } from '../../admin/utils/validations/formValidations';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    textInput: {
        height: 40,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'black'
    },
});

class SignupComponent extends React.Component {
    constructor(props) {
        super(props);

        // Don't set to undefined by default instead use empty string.
        // http://stackoverflow.com/a/38015169/5463404
        this.state = {};
        this.imageSelected = this.imageSelected.bind(this);
        this.onRegisterClicked = this.onRegisterClicked.bind(this);
    }

    imageSelected(localAvatarPath, imageFile) {
        this.setState({localAvatarPath, imageFile})
    }

    onRegisterClicked() {
        this.setState({buttonPressed: true});
        // if (this.state.name && this.state.email && this.state.password && this.state.imageFile) {
        if (this.state.email && this.state.password) {
            let formData = new FormData();
            // formData.append('name', _.trimEnd(this.state.name));
            // formData.append('data.email', this.state.email);
            // formData.append('data.password', this.state.password);
            // formData.append('avatar', this.state.imageFile);
            this.setState({formData}, () => {
                this.createUser.getWrappedInstance().fire();
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<TextInput*/}
                {/*placeholder="Name"*/}
                {/*style={styles.textInput}*/}
                {/*autoCapitalize={"none"}*/}
                {/*onChangeText={this.onNameChange}*/}
                {/*value={this.state.firstName}/>*/}
                {/*{this.state.buttonPressed && !this.state.name &&*/}
                {/*<Label value="Name is a required field" style={{color: 'red'}}/>}*/}
                <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    autoCapitalize={"none"}
                    onChangeText={this.onEmailChange}
                    value={this.state.email}/>
                {this.state.buttonPressed && !this.state.email &&
                <Label value="Email is a required field" style={{color: 'red'}}/>}
                {this.state.buttonPressed && this.state.emailError && this.state.email &&
                <Label value="Entered email is not valid." style={{color: 'red'}}/>}
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                    autoCapitalize={"none"}
                    onChangeText={this.onPasswordChange}
                    value={this.state.password}/>
                {this.state.buttonPressed && !this.state.password &&
                <Label value="Password is a required" style={{color: 'red'}}/>}
                {/*<HorizontalLayout style={{marginVertical: 10}}>*/}
                {/*<Label value={'Profile Picture'} style={{marginRight: 10, fontWeight: '400'}}/>*/}
                {/*<ImagePicker launchType="camera" onImageChange={this.imageSelected}/>*/}
                {/*</HorizontalLayout>*/}
                {/*{this.state.buttonPressed && !this.state.imageFile &&*/}
                {/*<Label value="Please select an image" style={{color: 'red'}}/>}*/}

                <RequestProcess
                    name='wf__register'
                    ref={(request) => {
                        this.createUser = request;
                    }}
                    defer={true}
                    data={{
                        'input.body': {
                            email:this.state.email,
                            password:this.state.password
                        }
                    }}
                    onSuccess={(response) => {this.props.onAuthSuccessful(response.data)}}
                    >
                    <View>
                        <Request.RenderIf stateIn={[0, 2, 4]}>
                            <Button
                                style={{marginVertical: 10}}
                                title="Register"
                                onPress={this.onRegisterClicked}/>
                        </Request.RenderIf>
                        <Request.Start>
                            <Spinner style={{alignSelf: 'center'}}/>
                        </Request.Start>
                        <Request.Error>
                            <Label value="Error in registering  you." style={{color: 'red'}}/>
                        </Request.Error>
                    </View>
                </RequestProcess>
            </View>
        )
    }

    onNameChange = (name) => {
        this.setState({
            name: _.trimStart(name)
        });
    };
    onPasswordChange = (password) => {
        this.setState({
            password: _.trimStart(_.trimEnd(password))
        });
    };
    onEmailChange = (email) => {
        emailValidation(email) ?
            this.setState({email: _.trim(email), emailError: false}) :
            this.setState({
                email: _.trim(email), emailError: true
            });
    };

}


export default SignupComponent;