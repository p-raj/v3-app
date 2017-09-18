import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderWidth: 0,
    }
});

class TextInputWeb extends React.Component {
    render() {
        const {underlineColor, ...props} = this.props;
        const borderColor = {
            borderColor: underlineColor
        };
        const defaultStyle = StyleSheet.flatten([props.style, styles.textInput]);

        const style = {...defaultStyle, ...borderColor};
        return (
            <TextInput {...props} style={style}/>
        );
    }
}


TextInputWeb.defaultProps = {
    underlineColor: 'gray'
};

TextInputWeb.propTypes = {
    underlineColor: PropTypes.string,
};

export default TextInputWeb;
