import { createStore, applyMiddleware } from 'redux';
import RootReducer from './RootReducer';
import { persistStore } from 'redux-persist';
import { rootSaga } from './RootSaga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [];
middleware.push(sagaMiddleware);
const store = createStore(RootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
