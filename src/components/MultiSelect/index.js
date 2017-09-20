import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Label from '../Text/index';
import CheckBox from '../CheckBox';

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            choices: {},
            checkedIds: []
        }
    }

    componentWillMount() {
        let checkedIds = [];
        let choices = this.props.children.map((child) => {
            // Add already checked items to checkedIds array
            if (child.props.selected) checkedIds.push(child.props.id);

            // For each child return a transformed MultiSelectItem
            return (<MultiSelectItem key={child.props.id}
                                     id={child.props.id}
                                     title={child.props.title}
                                     selected={child.props.selected}
                                     onItemChange={this.onItemChange}/>);
        });

        this.setState({choices, checkedIds});
    }

    render() {
        return (
            <View>
                <Label style={{marginBottom: 10}}>{this.props.title}</Label>
                {this.state.choices}
            </View>
        )
    }

    onItemChange = (itemId, itemState) => {
        let checkedIds = this.state.checkedIds;

        if (itemState) {
            checkedIds.push(itemId);
        }
        else {
            let index = checkedIds.indexOf(itemId);
            if (index > -1)
                checkedIds.splice(index, 1);
        }

        this.setState({
            checkedIds
        }, () => {
            this.props.onSelectionChange(this.state.checkedIds);
        });
    };
}

MultiSelect.propTypes = {
    title: PropTypes.string.isRequired,
    onSelectionChange: PropTypes.func,
};


/**
 * A single multi-select item.
 * Pass onItemChange() prop to listen for item's checked/unchecked state change.
 */
export class MultiSelectItem extends React.Component {
    render() {
        let {selected} = this.props;
        return (
            <CheckBox {...this.props}
                      checked={selected}
                      onCheckedChange={this.onCheckedChange}/>
        );
    }

    onCheckedChange = (isChecked) => {
        this.props.onItemChange(this.props.id, isChecked);
    }
}


MultiSelectItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onItemChange: PropTypes.func,
};