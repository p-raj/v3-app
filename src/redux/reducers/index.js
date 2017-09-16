import { combineReducers } from 'redux';
import { reducer as requestsReducer } from 're-quests';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';
import refreshTokenReducer from './refreshTokenReducer';
import membershipsReducer from './membershipReducer';
import runtimesReducer from './runtimesReducer';
import widgetsReducer from './widgetsReducer';
import appDataReducer from './app/appDataReducer';
import actionQueue from './app/actionsReducer';
import pickerReducer from './pickerReducer';
import configReducer from './configReducer';


let reducer = combineReducers({
    auth: authReducer,
    refreshToken: refreshTokenReducer,
    memberships: membershipsReducer,
    runtimes: runtimesReducer,
    widgets: widgetsReducer,
    picker: pickerReducer,

    // 3rd party
    requests: requestsReducer,
    route: routerReducer,

    // each app specific reducers
    queue: actionQueue,
    data: appDataReducer,

    // store the initial
    // configuration for the application
    config: configReducer
});

export default reducer;
