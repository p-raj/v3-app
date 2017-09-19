import { FAILED, START, SUCCESS } from '../../utils/constants';

import * as TYPE from '../actions/auth';
import { REFRESH_TOKEN_SUCCESS } from '../actions/refreshToken';


export default function auth(state = {}, action) {
    switch (action.type) {
        case TYPE.REQUEST_AUTH_START:
            return {
                ...state,
                ...action.payload,
                status: START
            };
        case TYPE.REQUEST_AUTH_SUCCESS:
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                token: action.payload.uuid,
                created_at_millis: new Date().getTime(),
                status: SUCCESS
            };
        case TYPE.UPDATE_USER_PROFILE:
            return {
                ...state,
                ...action.payload,
            };
        case TYPE.REQUEST_AUTH_ERROR:
            return {
                ...state,
                status: FAILED
            };
        case TYPE.LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
}
