import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../utils/theme'
import Text from './Text';

const styles = StyleSheet.create({
    buttonText: {
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.black,
        borderRadius: 3,
        justifyContent: "center"
    }
});

export default class ButtonComponent extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.buttonContainer, this.props.style]}
                onPress={this.props.onPress}>
                <Text style={[styles.buttonText, this.props.textStyle]}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}
