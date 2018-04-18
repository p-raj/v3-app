export const ENQUEUE_ACTION = 'ENQUEUE_ACTION';
export const DEQUEUE_ACTION = 'DEQUEUE_ACTION';

export function enqueueAction(action, widgetName, data) {
    return ({
        type: ENQUEUE_ACTION,
        payload: {
            widget: widgetName,
            action: action,
            data
        },
    })
}

export function dequeueAction(widgetName) {
    return ({
        type: DEQUEUE_ACTION,
        payload: {
            widget: widgetName
        }
    })
}