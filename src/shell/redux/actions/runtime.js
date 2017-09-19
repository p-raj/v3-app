export const SAVE_RUNTIMES = 'SAVE_RUNTIMES';


export function saveRuntimes(data) {
    return {
        type: SAVE_RUNTIMES,
        payload: data
    };
}
