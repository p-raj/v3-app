import React from 'react';
import PropTypes from 'prop-types';

const launchType = ['picker', 'camera', 'gallery'];

export default class ImagePicker extends React.Component {
    /*
     * https://developer.mozilla.org/en-US/docs/Mozilla/B2G_OS/API/Camera_API/Introduction
     */
    render() {
        switch (this.props.launchType) {
            case 'camera':
                return (
                    <input type="file" capture="camera" accept="image/*"
                           onChangeCapture={this.onImageSelected}
                           ref={(input) => {
                               this.input = input;
                           }}
                           hidden={true}/>
                );
            case 'picker':
            case 'gallery':
            default:
                return (
                    <input type="file" accept="image/*"
                           onChangeCapture={this.onImageSelected}
                           ref={(input) => {
                               this.input = input;
                           }}
                           hidden={true}/>
                );
        }
    }

    componentDidMount() {
        this.input.click();
        window.addEventListener('visibilitychange', this.windowFocusListener);
        window.addEventListener('focus', this.windowFocusListener);
    }

    componentWillUnmount() {
        window.removeEventListener('visibilitychange', this.windowFocusListener);
        window.removeEventListener('focus', this.windowFocusListener);
    }

    windowFocusListener = () => {
        if (typeof this.props.onImageChange === 'function') {
            this.props.onImageChange('');
        }
    };

    onImageSelected = (event) => {
        let mImagePath = null, mFile = null;

        // Get a reference to the taken picture or chosen file
        let files = event.target.files, file;
        if (files && files.length > 0) {
            file = files[0];
            mFile = file;
        }

        try {
            // Create ObjectURL
            mImagePath = window.URL.createObjectURL(file);

            // Revoke ObjectURL
            // URL.revokeObjectURL(imgURL);
        }
        catch (e) {
            try {
                // Fallback if createObjectURL is not supported
                let fileReader = new FileReader();
                fileReader.onload = (event) => {
                    mImagePath = event.target.result;
                };
                fileReader.readAsDataURL(file);
            }
            catch (e) {
                // TODO
                console.log(e);
            }
        }
        finally {
            // Fire callback
            if (typeof this.props.onImageChange === 'function') {
                this.props.onImageChange(mImagePath, mFile);
            }
        }
    }
}

ImagePicker.propTypes = {
    launchType: PropTypes.oneOf(launchType).isRequired,
    onImageChange: PropTypes.func,
};