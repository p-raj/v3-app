import { REQUEST_AUTH_SUCCESS } from '../actions/auth';


export function storageReducer(state = false, action) {
    switch (action.type) {
        case REQUEST_AUTH_SUCCESS:
            return true;
        default:
            return state;
    }
}