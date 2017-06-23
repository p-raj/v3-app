import axios from 'axios';
import * as URL from '../../../src/utils/endpoints';

export const REQUEST_AUTH_START = 'REQUEST_AUTH_START';
export const REQUEST_AUTH_SUCCESS = 'REQUEST_AUTH_SUCCESS';
export const REQUEST_AUTH_ERROR = 'REQUEST_AUTH_ERROR';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';


export default function auth(email, password) {
    let requestBody = {
        email,
        password
    };

    return (dispatch) => {
        dispatch(authStart());

        axios.post(URL.LOGIN, requestBody, {headers:{'HOST-VERIS':'users.veris.in'}})
            .then((response) => {
                switch (response.status) {
                    case  200:
                        dispatch(authSuccess(response.data));
                        break;
                    default:
                        dispatch(authError(response.data))
                }
            })
            .catch((err) => {
                dispatch(authError(err))
            })
    }
}

function authStart() {
    return {
        type: REQUEST_AUTH_START
    };
}

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

function authError(error) {
    return {
        type: REQUEST_AUTH_ERROR,
        payload: error
    };
}