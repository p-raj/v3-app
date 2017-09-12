export const ENQUEUE_ACTION = 'ENQUEUE_ACTION';
export const DEQUEUE_ACTION = 'DEQUEUE_ACTION';

/**
 * action: $set, $operation
 * context: widget, runtime, session, template?
 * data: snapshot of data available at the time of execution
 */
export function enqueue(action, context, data) {
    return ({
        type: ENQUEUE_ACTION,
        payload: {
            action,
            context,
            data
        }
    })
}

export function dequeue(action, context, data) {
    return ({
        type: DEQUEUE_ACTION,
        payload: {
            action,
            context,
            data
        }
    })
}