import { FAILED, START, SUCCESS } from '../../utils/constants';
import * as TYPE from '../actions/widget';
import { CLEAR_APP_DATA } from '../actions/app/appData';


export default function widgetsReducer(state = {}, action) {
    switch (action.type) {
        case TYPE.GET_WIDGETS_START:
            return {
                ...state,
                ...action.payload,
                status: START
            };
        case TYPE.GET_WIDGETS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                status: SUCCESS
            };
        case TYPE.GET_WIDGETS_ERROR:
            return {
                ...state,
                ...action.payload.data,
                statusText: action.payload.statusText,
                statusCode: action.payload.status,
                status: FAILED
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
