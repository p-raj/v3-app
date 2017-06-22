import { LOAD_REDUX_STATE } from '../actions/storage';
import { REQUEST_AUTH_SUCCESS } from '../actions/auth';


export function storageReducer(state = false, action) {
    switch (action.type) {
        case LOAD_REDUX_STATE:
            return true;
        case REQUEST_AUTH_SUCCESS:
            return true;
        default:
            return state;
    }
}