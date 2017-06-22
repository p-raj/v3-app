import * as TYPE from '../actions/actionQueue';

export default function actionQueue(state = {}, action) {
    switch (action.type) {
        case TYPE.ENQUEUE_ACTION:
            return {
                ...state,
                [action.payload.widget]: {
                    queue: addToQueue(
                        state[action.payload.widget] ? state[action.payload.widget].queue : [],
                        action
                    )
                }
            };
        case TYPE.DEQUEUE_ACTION :
            return {
                ...state,
                [action.payload.widget]: {
                    queue: removeFromQueue(
                        state[action.payload.widget].queue,
                        action
                    )
                }
            };
        default:
            return state;
    }
}

function addToQueue(state = [], action) {
    switch (action.type) {
        case TYPE.ENQUEUE_ACTION:
            return [...state, action.payload];
        default:
            return state;
    }
}

function removeFromQueue(state = [], action) {
    switch (action.type) {
        case TYPE.DEQUEUE_ACTION:
            let copyQueue = [...state];
            copyQueue.shift();
            return copyQueue;
        default:
            return state;
    }
}