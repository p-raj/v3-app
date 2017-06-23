import React from 'react';
import QRCode from 'react-native-qrcode';
import { View } from 'react-native';

export default class QrView extends React.Component {
    render() {
        // FIXME: There is an issue in library bgColor is treated as fgColor and vice versa
        // https://github.com/cssivision/react-native-qrcode/issues/24
        return (
            <View style={{backgroundColor: this.props.bgColor}}>
                <View style={{margin: 10}}>
                    <QRCode
                        value={this.props.value}
                        size={this.props.size}
                        bgColor={this.props.fgColor}
                        fgColor={this.props.bgColor}
                    />
                </View>
            </View>
        )
    }
}

QrView.propTypes = {
    value: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
    bgColor: React.PropTypes.string,
    fgColor: React.PropTypes.string,
};
