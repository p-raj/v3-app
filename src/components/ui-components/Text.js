import React from 'react';
import { StyleSheet, Text } from 'react-native';
import theme from '../../utils/theme'

const styles = StyleSheet.create({
    defaultTextStyle: {
        backgroundColor: 'transparent',
        fontSize: theme.h4,
        color: theme.black
    }
});

export default class TextComponent extends React.Component {
    render() {
        return (
            <Text style={[styles.defaultTextStyle, this.props.style]}>
                {this.props.children}
            </Text>
        )
    }
}