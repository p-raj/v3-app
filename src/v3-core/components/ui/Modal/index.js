import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ReactModal from 'react-modal';
import { IconButton } from 're-render';

export default class M extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const customStyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '0px',
                outline: 'none',
                padding: '0px'
            }
        };
        return (
            <View>
                <ReactModal contentLabel={this.props.contentLabel}
                            transparent={false}
                            isOpen={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setModalVisible(false)
                            }}
                            style={customStyle}>

                    {this.props.children}

                    <View style={{position: 'absolute', left: 0, top: 0}}>
                        <IconButton name="times"
                                    onPress={
                                        () => {
                                            this.setModalVisible(!this.state.modalVisible)
                                        }
                                    }/>
                    </View>
                </ReactModal>

                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true)
                    }}>
                    <Text>{this.props.buttonText}</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
M.propTypes = {
    buttonText: React.PropTypes.string.isRequired,
    contentLabel: React.PropTypes.string.isRequired,
};