import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';
import { Icon as IconButton } from '../../../re-render';

export default class M extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View>
                <Modal
                    contentLabel={this.props.contentLabel}
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    {this.props.children}
                    <View style={{position: 'absolute', left: 0, top: 0}}>
                        <IconButton name="times"
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
                                    }}/>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true)
                    }}>
                    <Text>{this.props.buttonText}</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

M.propTypes = {
    buttonText: React.PropTypes.string.isRequired,
    contentLabel: React.PropTypes.string.isRequired,
};
