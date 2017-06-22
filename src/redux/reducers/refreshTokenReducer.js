import { FAILED, START, SUCCESS } from '../../common/constants';

import * as TYPE from '../actions/refreshToken';
import { REQUEST_AUTH_SUCCESS } from '../actions/auth';

export default function refreshTokenReducer(state = {}, action) {
    switch (action.type) {
        case TYPE.REFRESH_TOKEN_START:
            return {
                ...state,
                ...action.payload,
                status: START
            };
        case TYPE.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                created_at_millis: new Date().getTime(),
                status: SUCCESS
            };
        case TYPE.REFRESH_TOKEN_ERROR:
            return {
                ...state,
                ...action.payload.data,
                statusText: action.payload.statusText,
                statusCode: action.payload.status,
                status: FAILED
            };
        case REQUEST_AUTH_SUCCESS:
            return {};
        default:
            return state;
    }
}
