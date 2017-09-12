import Action from '../../../v3-core/actions/index';
import { enqueue } from './queue';


export const execute = (action, context, data) => {
    return (dispatch) => {
        const act = new Action(action);
        act.execute(context, data)
            .then(() => {
                if (!act.success) return;
                dispatch(enqueue(act.success, context, data))
            })
            .catch(() => {
                if (!act.error) return;
                dispatch(enqueue(act.error, context, data))
            })
    }
};
