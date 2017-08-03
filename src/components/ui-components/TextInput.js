import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import theme from '../../utils/theme'

const styles = StyleSheet.create({
    texInputWrapper: {
        borderBottomWidth: 1,
        borderColor: theme.black,
        width: '100%',
    },
    textInput: {
        height: 40,
        fontSize: theme.h3,
        borderWidth: 0,
        color: theme.black,
    },
});

export default class TextInputComponent extends React.Component {
    render() {
        return (
            <View style={[styles.texInputWrapper, this.props.wrapperStyle]}>
                <TextInput
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderColor || theme.placeholderColor}
                    style={this.props.style || styles.textInput}
                    autoCorrect={this.props.autoCorrect || false}
                    underlineColorAndroid={"transparent"}
                    autoComplete={this.props.autoComplete || "false"}
                    secureTextEntry={this.props.secureTextEntry || false}
                    keyboardType={this.props.keyboardType || "default"}
                    enablesReturnKeyAutomatically={this.props.enablesReturnKeyAutomatically || true}
                    autoCapitalize={this.props.autoCapitalize || "none"}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}/>
            </View>
        )
    }
}