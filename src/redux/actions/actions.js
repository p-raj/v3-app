import Action from '../../v3-core/actions';
import { enqueueAction } from './actionQueue';


export function execute(action, actionContext, data) {
    return (dispatch) => {
        const act = new Action(action);
        act.execute(data, actionContext)
            .then((result) => {
                if (!act.success) return;
                dispatch(enqueueAction(act.success, actionContext.widget.name, result))
            })
            .catch((err) => {
                if (!act.error) return;
                dispatch(enqueueAction(act.error, actionContext.widget.name, err))
            })
    }
}