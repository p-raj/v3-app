import { FAILED, START, SUCCESS } from '../../common/constants';
import * as TYPE from '../actions/widget';
import { CLEAR_SESSION_DATA } from '../actions/session';


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
        case CLEAR_SESSION_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
