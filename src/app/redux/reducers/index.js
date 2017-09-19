import { reducer as requestsReducer } from 're-quests';
import { combineReducers } from 'redux';

import authReducer from 'shell/redux/reducers/authReducer';
import membershipsReducer from 'shell/redux/reducers/membershipReducer';

import actionQueueReducer from './actionsReducer';
import appDataReducer from './appDataReducer';
import widgetsReducer from './widgetsReducer';


let reducer = combineReducers({
    widgets: widgetsReducer,

    queue: actionQueueReducer,
    data: appDataReducer,

    // TODO
    // remove the unnecessary reducers
    auth: authReducer,
    memberships: membershipsReducer,

    // 3rd party
    requests: requestsReducer
});

export default reducer;
