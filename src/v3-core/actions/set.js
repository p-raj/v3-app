import store from '../../redux/store';
import updateComponentData from '../../redux/actions/updateComponentData';

export default function set(obj) {
    // eslint-disable-next-line
    const {actionContext, options, data} = obj;
    const widgetUuid = actionContext.widget.uuid;

    // TODO: rename componentData to sessionData
    store.dispatch(updateComponentData(widgetUuid, options.key, options.value));
    return data;
}