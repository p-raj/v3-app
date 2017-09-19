import { CLEAR_APP_DATA } from 'app/redux/actions/appData';
import * as TYPE from 'app/redux/actions/widget';


export default function widgetsReducer(state = {}, action) {
    switch (action.type) {
        case TYPE.GET_WIDGETS_START:
            return {
                ...state,
                ...action.payload
            };
        case TYPE.GET_WIDGETS_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case TYPE.GET_WIDGETS_ERROR:
            return {
                ...state,
                ...action.payload.data,
                statusText: action.payload.statusText,
                statusCode: action.payload.status
            };
        case CLEAR_APP_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
