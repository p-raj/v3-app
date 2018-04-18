export const REQUEST_AUTH_START = 'REQUEST_AUTH_START';
export const REQUEST_AUTH_SUCCESS = 'REQUEST_AUTH_SUCCESS';
export const REQUEST_AUTH_ERROR = 'REQUEST_AUTH_ERROR';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';


export function logout() {
    return {
        type: LOGOUT_CURRENT_USER
    };
}

export function authSuccess(data) {
    return {
        type: REQUEST_AUTH_SUCCESS,
        payload: data
    };
}
export function updateAuth(data) {
    return {
        type: UPDATE_USER_PROFILE,
        payload: data
    };
}
