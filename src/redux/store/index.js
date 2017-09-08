import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import { offline } from 'redux-offline';

import offlineConfig from 'redux-offline/lib/defaults';
import thunk from 'redux-thunk';

import storage from '../middlewares/storage';
import reducer from '../reducers';


const middlewares = [thunk];

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
    // Logger must be the last middleware in chain, otherwise it will log thunk and others, not actual actions
    // https://github.com/evgenyrodionov/redux-logger/issues/20
    const developmentMiddlewares = [createLogger()];

    middlewares.push(...developmentMiddlewares);
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
    reducer,
    {},
    composeEnhancers(
        applyMiddleware(
            ...middlewares,

            /*
             * The middleware for syncing redux store & database.
             * It should always be at the last.
             * Since it writes the final state to the database
             * */
            storage,
        ),
        offline(offlineConfig)
    ));

export default store;
