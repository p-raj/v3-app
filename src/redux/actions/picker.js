export const OPEN_PICKER = 'OPEN_PICKER';
export const CLOSE_PICKER = 'CLOSE_PICKER';

export function openPicker(pickerType, actionContext, options) {
    return ({
        type: OPEN_PICKER,
        payload: {
            pickerType: pickerType,
            actionContext: actionContext,
            options: options

        }
    })
}

export function closePicker() {
    return ({
        type: CLOSE_PICKER,
    })
}