import * as TYPE from '../../actions/app/queue';
import ActionFactory from '../../actions';

export default function actions(state = {}, dispatcher) {
    switch (dispatcher.type) {
        case TYPE.ENQUEUE_ACTION:
            let {action, context} = dispatcher.payload;
            let executor = ActionFactory.executor(action.type)(context);
            return {
                ...state,
                [executor]: enqueue(
                    state[executor] ? state[executor].queue : [],
                    dispatcher
                )
            };
        case TYPE.DEQUEUE_ACTION:
            executor = ActionFactory.executor(dispatcher.payload.action.type)(dispatcher.payload.context);
            return {
                ...state,
                [executor]: dequeue(
                    state[executor],
                    dispatcher
                )
            };
        default:
            return state;
    }
}

function enqueue(state = [], action) {
    switch (action.type) {
        case TYPE.ENQUEUE_ACTION:
            return [...state, action.payload];
        default:
            return state;
    }
}

function dequeue(state = [], action) {
    switch (action.type) {
        case TYPE.DEQUEUE_ACTION:
            let copyQueue = [...state];
            copyQueue.shift();
            return copyQueue;
        default:
            return state;
    }
}
