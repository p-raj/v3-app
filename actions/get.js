import store from '../../redux/store';

// Remember to change this whenever reducer's key changes in root reducer.
const SESSION_DATA_REDUX_KEY = 'componentData';

export default function get(obj) {
    const {actionContext, options} = obj;

    const state = store.getState();

    const widgetData = state[SESSION_DATA_REDUX_KEY][actionContext.widget.name];

    const getValue = widgetData[options.key];

    return {
        [options.as]: getValue
    };
}
