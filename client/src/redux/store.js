import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

// thunk-middlewear allows us to fire off functions
// import thunk from 'redux-thunk';
// Redux persist library
import {persistStore} from 'redux-persist';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

// run individual sagas
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {store,persistor};