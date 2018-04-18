export const GET_WIDGETS_START = 'GET_WIDGETS_START';
export const GET_WIDGETS_SUCCESS = 'GET_WIDGETS_SUCCESS';
export const GET_WIDGETS_ERROR = 'GET_WIDGETS_ERROR';


export function widgetSuccess(runtime, response) {
    return (dispatch) => {
        let payload = {};
        payload[runtime.uuid] = {
            'session': response.headers['x-vrt-session'],
            'widgetAPI': response.data
        };

        /*
         * Problem: Widgets will be different for each runtime.
         * We need to access widgets from different runtimes, and each will have a different response.
         * Fetching it again & again is solution but not a good one. We'll still be sending
         * requests again to refresh,
         * but at least we won't get a blank screen every time on changing runtime.
         *
         * Solution 1: Copy the widget under runtime object
         * Solution 2: Convert widget like
         *   r1: {...widget}
         * All credits to @Abhinav :+1:
         *
         * Following Solution 2.
         * */
        dispatch(getWidgetsSuccess(payload));

        /*
         * We also need to store the Session key provided by this API,
         * to resume update the info filled by user.
         * */

    }
}

function getWidgetsSuccess(data) {
    return {
        type: GET_WIDGETS_SUCCESS,
        payload: data
    };
}