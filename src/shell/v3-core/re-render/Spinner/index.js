import React from 'react';
import { ActivityIndicator } from 'react-native';

export default class Spinner extends React.Component {
    render() {
        return (
            <ActivityIndicator animating={true} {...this.props} />
        )
    }
}

Spinner.propTypes = ActivityIndicator.propTypes;