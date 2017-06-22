import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from '../v3-core/components/pickers/ImagePicker';
import { closePicker } from '../redux/actions/picker';
import updateComponentData from '../redux/actions/updateComponentData';

export const PIC_FROM_CAMERA = 'PIC_FROM_CAMERA';
export const PIC_FROM_GALLERY = 'PIC_FROM_GALLERY';

class PickerContainer extends React.Component {
    render() {
        return (
            <View>
                {
                    this.props.show &&
                    this.getPickerComponent(this.props.pickerType)
                }
            </View>
        )
    }

    getPickerComponent = (pickerType) => {
        console.log("pickerType", pickerType);
        switch (pickerType) {
            case PIC_FROM_CAMERA:
                return <ImagePicker launchType="camera"
                                    onImageChange={this.onImageChange}
                />;
            case PIC_FROM_GALLERY:
                return <ImagePicker launchType="gallery"
                                    onImageChange={this.onImageChange}
                />;
            default :
                return (<Text> Picker Not Implemented </Text>);
        }
    };

    onImageChange = (imagePath, file) => {

        console.log("Inside PickerContainer.js: imagePath", imagePath);
        let widgetUuid = this.props.actionContext.widget.uuid;
        let fieldName = this.props.options.name;

        this.props.dispatch(updateComponentData(widgetUuid, fieldName, imagePath));
        this.props.dispatch(closePicker());
    }
}


PickerContainer = connect((store) => {
    return {
        show: store.picker.show,
        pickerType: store.picker.pickerType,
        actionContext: store.picker.actionContext,
        options: store.picker.options,
    }
})(PickerContainer);

export default PickerContainer;