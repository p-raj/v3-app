import { CLEAR_SESSION_DATA } from '../actions/session';
export const TYPE_SWITCH_WIDGET_STATE = "TYPE_SWITCH_WIDGET_STATE";

export default function switchWidgetState(state = {}, action) {
    switch (action.type) {
        case TYPE_SWITCH_WIDGET_STATE:
            return {
                ...state,
                [action.payload]: 'loading'
            };
        case CLEAR_SESSION_DATA:
            return {};
        default:
            return state;
    }
}