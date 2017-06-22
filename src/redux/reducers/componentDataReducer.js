import _ from 'lodash';

import { UPDATE_COMPONENT_DATA } from '../actions/updateComponentData';
import { CLEAR_SESSION_DATA, GET_SESSION_DATA_SUCCESS } from '../actions/session';


export default function componentDataReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_COMPONENT_DATA:
            // FIXME Remove this chutiyappa
            if (state.last_modified === action.payload.last_modified) {
                return state;
            }

            let data = _.merge(state, action.payload);
            return {...data};
        case GET_SESSION_DATA_SUCCESS:
            // FIXME:BUG When the runtime is initialized for the first time,
            // state is empty so state.last_modified is undefined
            // Due to state.last_modified being undefined the below condition becomes false
            // So we go ahead and return a new state with merged action.payload & state.
            // Due to that, subscribes to componentData slice get notified and Widget.js refreshes, calling render again,
            // This leads to the currently being typed data overwritten with blank (empty) values in components.
            // Recreate: when user starts a runtime and is filling some values in widget's textfield component
            // if the user cannot submit the widget within the polling time of getSessionData API, his efforts will be lost.
            if (state.last_modified === action.payload.last_modified)
                return state;

            let mergedData = _.merge(JSON.parse(JSON.stringify(state)), JSON.parse(JSON.stringify(action.payload)));
            return JSON.parse(JSON.stringify(mergedData));
        case CLEAR_SESSION_DATA:
            return {};
        default:
            return state;
    }
}
