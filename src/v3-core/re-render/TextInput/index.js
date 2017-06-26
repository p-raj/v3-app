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
        const borderColor = {
            borderColor: this.props.underlineColor
        };
        const defaultStyle = StyleSheet.flatten([this.props.style, styles.textInput]);

        const style = {...defaultStyle, ...borderColor};
        return (
            <TextInput {...this.props}
                       style={style}
            />
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
