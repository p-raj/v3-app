import Action from '../../v3-core/actions';
import { enqueueAction } from './actionQueue';


export function execute(action, env, data) {
    return (dispatch) => {
        const act = new Action(action);
        act.execute(data, env)
            .then((result) => {
                if (!act.success) return;
                dispatch(enqueueAction(act.success, env.widget.name, result))
            })
            .catch((err) => {
                if (!act.error) return;
                dispatch(enqueueAction(act.error, env.widget.name, err))
            })
    }
}