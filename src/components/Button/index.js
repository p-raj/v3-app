import React from 'react';
import { Button as RNButton, StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../../shell/utils/theme';


const styles = StyleSheet.create({

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
        borderWidth: 1,
        borderColor: 'black'
    },
    error: {
        color: theme.errorMessageColor
    }

});


export default class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.buttonContainer, {...this.props.style}]}
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}

Button.propTypes = RNButton.propTypes;
