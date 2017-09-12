/**
 * Action creator to remove session data for a given runtime
 * @type {string}
 */
export const CLEAR_APP_DATA = 'CLEAR_APP_DATA';

export function clearAppData(application) {
    let payload = {};
    payload[application.uuid] = {
        'session': undefined
    };

    return {
        type: CLEAR_APP_DATA,
        payload
    };
}
