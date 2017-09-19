import React from 'react';
import { Text as RNText } from 'react-native';

class Text extends React.Component {
    render() {
        return (
            <RNText {...this.props}/>
        )
    }
}

Text.propTypes = RNText.propTypes;

export default Text;
