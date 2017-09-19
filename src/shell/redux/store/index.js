import { applyMiddleware, compose, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import createLogger from 'redux-logger';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import thunk from 'redux-thunk';
import storage from 'extensions/storage';

import reducer from '../reducers';


const middlewares = [thunk];

let enhancers = [];
if (process.env.NODE_ENV === 'development') {
    // Logger must be the last middleware in chain, otherwise it will log thunk and others, not actual actions
    // https://github.com/evgenyrodionov/redux-logger/issues/20
    const developmentMiddlewares = [createLogger()];

    middlewares.push(...developmentMiddlewares);
    enhancers.push(devToolsEnhancer())
}

const store = createStore(
    reducer,
    {},
    compose(
        applyMiddleware(...middlewares),
        ...enhancers,
        offline({
            ...offlineConfig,
            persistOptions: {
                storage: storage
            }
        })
    ));

export default store;
