import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';

// thunk-middlewear allows us to fire off functions
import thunk from 'redux-thunk';
// Redux persist library
import {persistStore} from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default {store,persistor};