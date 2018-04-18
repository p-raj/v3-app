import React, { PropTypes } from 'react';
import { View } from 'react-native';
import QrReader from 'react-qr-reader';
import { Icon as IconButton } from '../../../re-render';

const defaultHeight = 240, defaultWidth = 320;

export default class QrScanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: this.props.delay,
            facingMode: this.props.facingMode || "front",
        };
    }

    render() {
        const previewStyle = {
            height: this.props.height || defaultHeight,
            width: this.props.width || defaultWidth,
            // objectFit: 'fill'
        };

        return (
            <View>
                <QrReader
                    delay={this.state.delay}
                    style={previewStyle}
                    onError={this.props.onError}
                    onScan={this.props.onScan}
                    facingMode={this.state.facingMode}
                />
                <View style={{position: 'absolute', right: 0, top: 0}}>
                    <IconButton name="refresh"
                                onPress={() => {
                                    const facingMode = this.state.facingMode === "front" ? "rear" : "front";

                                    this.setState({facingMode});
                                }}/>
                </View>
            </View>
        )
    }
}

QrScanner.propTypes = {
// The delay between scans in milliseconds. To disable the interval pass in false
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    facingMode: PropTypes.oneOf(["front", "rear"]),
    onScan: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
