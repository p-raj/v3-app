import axios from 'axios';

import * as URL from '../../common/endpoints';

export const REFRESH_TOKEN_START = 'REFRESH_TOKEN_START';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';


export default function refreshToken(token) {
    const data = new FormData();
    data.append('refresh_token', token);
    data.append('grant_type', 'refresh_token');

    return (dispatch) => {
        dispatch(refreshTokenStart());

        axios.post(URL.REFRESH_TOKEN, data)
            .then((response) => {
                switch (response.status) {
                    case  200:
                        dispatch(refreshTokenSuccess(response.data));
                        break;
                    default:
                        dispatch(refreshTokenError(response.data))
                }
            })
            .catch((err) => {
                console.warn('Error', err.response);
                dispatch(refreshTokenError({...err.response}))
            })
    }
}

function refreshTokenStart() {
    return {
        type: REFRESH_TOKEN_START
    };
}

function refreshTokenSuccess(data) {
    return {
        type: REFRESH_TOKEN_SUCCESS,
        payload: data
    };
}

function refreshTokenError(error) {
    return {
        type: REFRESH_TOKEN_ERROR,
        payload: error
    };
}