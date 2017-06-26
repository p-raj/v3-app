import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import RecyclerView from '../RecyclerView';
import Icon from '../Icon';

const styles = {
    container: {
        width: 200,
    },
    autoCompleteInput: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#e0e0e0',
    },
    listContainer: {
        zIndex: 1,
        position: 'absolute',
        marginTop: 40,
        backgroundColor: '#FFF',
        width: 200
    },
    listItem: {
        height: 40,
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#e0e0e0',
        borderTopWidth: 0,
    },
};

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showList: false,
            selectedItem: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.autoCompleteInput, {backgroundColor: this.props.placeholderBackground}]}
                    onPress={() => {
                        this.setState({showList: !this.state.showList})
                    }}>
                    <View
                        style={[{flexDirection: 'row', marginRight: 10, marginLeft: 10}]}>
                        <Text style={{flex: 1, color: this.props.placeholderColor}}>
                            {this.state.selectedItem.value || this.props.placeholder}
                        </Text>
                        {(!this.state.selectedItem) ?
                            <Icon
                                name={this.state.showList ? 'angle-up' : 'angle-down'}
                                type='font-awesome'
                                color={this.props.placeholderColor}
                            /> :
                            <Icon
                                name='close'
                                type='font-awesome'
                                color={this.props.placeholderColor}
                                onPress={() => {
                                    this.onItemClicked('')
                                }}
                            />
                        }
                    </View>
                </TouchableOpacity>

                {
                    this.state.showList
                    &&
                    <View style={styles.listContainer}>
                        <RecyclerView
                            onItemClicked={this.onItemClicked}
                            style={{maxHeight: this.props.listHeight}}
                            enableEmptySections={true}
                            dataSource={this.props.list}
                            renderRow={(rowData) => (
                                <TouchableOpacity
                                    style={[styles.listItem, this.props.itemStyle]}>
                                    <Text style={{marginLeft: 10}}>
                                        {rowData.value}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                }

            </View>
        )
    }

    onItemClicked = (rowData) => {
        this.setState({showList: false, selectedItem: rowData});
        if (this.props.onItemSelected)
            this.props.onItemSelected(rowData);
    }
}

Dropdown.defaultProps = {
    listHeight: 200,
    placeholder: 'Select',
    placeholderColor: 'black'
};

Dropdown.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    placeholder: PropTypes.string,
    onItemSelected: PropTypes.func,
    listHeight: PropTypes.number,
    placeholderBackground: PropTypes.string,
    placeholderColor: PropTypes.string,
    itemStyle: PropTypes.object,
};
