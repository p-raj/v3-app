import React from 'react';
import { View } from 'react-native';

import ImagePicker from 'react-native-image-picker';

const launchType = ['picker', 'camera', 'gallery'];

export default class IP extends React.Component {
    render() {
        return (
            <View>
                {this.selectPhotoTapped()}
            </View>
        );
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        switch (this.props.launchType) {
            case 'camera':
                ImagePicker.launchCamera(options, (response) => {
                    this.handleResponse(response);
                });
                break;

            case 'gallery':
                ImagePicker.launchImageLibrary(options, (response) => {
                    this.handleResponse(response);
                });
                break;

            default:
                ImagePicker.showImagePicker(options, (response) => {
                    this.handleResponse(response);
                });
                break;
        }
    }

    handleResponse(response) {
        console.log('Response = ', response);

        if (response.uri) {
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            if (typeof this.props.onImageChange === 'function') {
                this.props.onImageChange(response.uri, response.data);
            }
            return;
        }

        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        this.props.onImageChange('');
    }
}

IP.propTypes = {
    launchType: React.PropTypes.oneOf(launchType).isRequired,
    onImageChange: React.PropTypes.func,
};