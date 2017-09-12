import axios from 'axios';
import * as URL from '../../../utils/endpoints';

export const GET_SESSION_DATA_START = 'GET_SESSION_DATA_START';
export const GET_SESSION_DATA_SUCCESS = 'GET_SESSION_DATA_SUCCESS';
export const GET_SESSION_DATA_ERROR = 'GET_SESSION_DATA_ERROR';

export function getSessionData(sessionId) {
    return (dispatch) => {
        dispatch(getSessionDataStart());

        axios.get(`${URL.GET_SESSION_DATA}${sessionId}/`, {
            headers: {'HOST-VERIS': `apis.veris.in`}
        })
            .then((response) => {
                let {last_modified, ...data} = response.data.data;
                dispatch(getSessionDataSuccess({last_modified, ...data}));
            })
            .catch((err) => {
                dispatch(getSessionDataError(err));
            })
    }
}

function getSessionDataStart() {
    return {
        type: GET_SESSION_DATA_START
    };
}

function getSessionDataSuccess(data) {
    return {
        type: GET_SESSION_DATA_SUCCESS,
        payload: data
    };
}

function getSessionDataError(error) {
    return {
        type: GET_SESSION_DATA_ERROR,
        payload: error
    };
}
