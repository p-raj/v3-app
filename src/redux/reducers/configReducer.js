import { CONFIG_WIDGET } from '../actions/config';

export default function configReducer(state = {}, action) {
    switch (action.type) {
        case CONFIG_WIDGET:
            return {
                widget: action.payload
            };
        default:
            return state;
    }
}
