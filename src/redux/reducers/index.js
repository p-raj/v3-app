import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { routerReducer } from 'react-router-redux';
import { storageReducer } from './storageReducer';
import refreshTokenReducer from './refreshTokenReducer';
import membershipsReducer from './membershipReducer';
import runtimesReducer from './runtimesReducer';
import widgetsReducer from './widgetsReducer';
import componentDataReducer from './componentDataReducer';
import actionQueue from './actionQueue';
import pickerReducer from './pickerReducer';
import configReducer from './configReducer';


let reducer = combineReducers({
    storage: storageReducer,
    route: routerReducer,
    auth: authReducer,
    refreshToken: refreshTokenReducer,
    memberships: membershipsReducer,
    runtimes: runtimesReducer,
    widgets: widgetsReducer,
    componentData: componentDataReducer,

    actionQueue: actionQueue,
    picker: pickerReducer,
    config: configReducer,
});

export default reducer;
