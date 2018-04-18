import { CLOSE_PICKER, OPEN_PICKER } from '../actions/picker';

export default function (state = {show: false}, action) {
    switch (action.type) {
        case OPEN_PICKER:
            return {
                ...state,
                show: true,
                pickerType: action.payload.pickerType,
                actionContext: action.payload.actionContext,
                options: action.payload.options
            };
        case CLOSE_PICKER:
            return {
                ...state,
                show: false,
                pickerType: ''
            };
        default:
            return state;
    }
}