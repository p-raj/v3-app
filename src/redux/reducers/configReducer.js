import { CONFIG_WIDGET } from '../actions/config';
import { LOAD_REDUX_STATE } from '../actions/storage';

export default function configReducer(state = {}, action) {
    switch (action.type) {
        case CONFIG_WIDGET:
            return {
                widget: action.payload
            };
        case LOAD_REDUX_STATE:
            if (action.payload) {
                return {...action.payload.config};
            }
            return {};
        default:
            return state;
    }
}
