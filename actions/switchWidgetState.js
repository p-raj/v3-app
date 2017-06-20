import store from '../../app/redux/store';
import { TYPE_SWITCH_WIDGET_STATE } from '../../app/redux/reducers/widgetStateReducer';

export default function (obj) {
    const {actionContext} = obj;
    store.dispatch({type: TYPE_SWITCH_WIDGET_STATE, payload: actionContext.widget.uuid})
}