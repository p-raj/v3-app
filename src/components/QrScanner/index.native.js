import React from 'react';
import PropTypes from 'prop-types';
import Camera from 'react-native-camera';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Icon as IconButton } from 'src/components/index';
let {width, height} = Dimensions.get('window');

let timer = undefined;

export default class QrScanner extends React.Component {
    constructor(props) {
        super(props);
        this.camera = null;

        let {front, back} = Camera.constants.Type;
        const facingMode = (this.props.facingMode === "front" ? front : back);

        this.state = {
            delay: this.props.delay || 1000,
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.data,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            cameraFace: facingMode,
            canScan: true,
        };
    }

    render() {
        const previewStyle = {
            height: this.props.height || height,
            width: this.props.width || width,
            // objectFit: 'fill'
        };
        return (
            <View style={previewStyle}>

                <Camera style={styles.preview}
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        aspect={this.state.camera.aspect}
                        captureTarget={this.state.camera.captureTarget}
                        type={this.state.cameraFace}
                        defaultTouchToFocus
                        mirrorImage={false}
                        onBarCodeRead={this.onBarCodeRead}

                />
                <View style={{position: 'absolute', top: 0, right: 0}}>
                    <IconButton name="refresh"
                                onPress={this._flipCamera}/>
                </View>
            </View>
        )
    }

    onBarCodeRead = (result) => {
        if (!this.state.canScan)
            return;

        if (this.props.onScan)
            this.props.onScan(result.data);

        // Disable the scanner and set a timer to enable it again.
        this.setState({canScan: false}, () => {
            timer = setTimeout(() => {
                this.setState({canScan: true});
            }, this.state.delay)
        })
    };

    _flipCamera = () => {
        let {front, back} = Camera.constants.Type;
        console.log("this.state.cameraFace ", this.state.cameraFace);
        const cameraFace = (this.state.cameraFace === front ? back : front);
        console.log("const cameraFace", cameraFace);

        this.setState({cameraFace: cameraFace});
    };

    componentWillUnmount() {
        // Clear the timer if it exists else it would try to set state even though the component has been unmounted
        if (timer) {
            clearTimeout(timer);
        }
    }
}


const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});

QrScanner.propTypes = {
// The delay between scans in milliseconds. Default interval = 1000ms
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    facingMode: PropTypes.oneOf(["front", "rear"]),
    onScan: PropTypes.func.isRequired,
    // TODO: not yet implemented
    onError: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
