export const OPEN_PICKER = 'OPEN_PICKER';
export const CLOSE_PICKER = 'CLOSE_PICKER';

export function openPicker(pickerType, env, options) {
    return ({
        type: OPEN_PICKER,
        payload: {
            pickerType: pickerType,
            env: env,
            options: options

        }
    })
}

export function closePicker() {
    return ({
        type: CLOSE_PICKER,
    })
}