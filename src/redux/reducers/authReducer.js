import { FAILED, START, SUCCESS } from '../../common/constants';

import * as TYPE from '../actions/auth';
import { LOAD_REDUX_STATE } from '../actions/storage';
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
        case TYPE.REQUEST_AUTH_ERROR:
            return {
                ...state,
                status: FAILED
            };
        case TYPE.LOGOUT_CURRENT_USER:
            return {};
        case LOAD_REDUX_STATE:
            if (action.payload) {
                return {...action.payload.auth};
            }

            return {};
        default:
            return state;
    }
}
