import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
//reducers
import { rootReducer, initialState } from './reducers';

//sagas
import jobSagas from './sagas/JobSagas';

const composeEnhancers = composeWithDevTools({});

const sagaMiddleware = createSagaMiddleware();

function configureStore(state, hist) {
    const middlewares = applyMiddleware(
        //route middleware will go here
        sagaMiddleware
    );

    let store = createStore(
        rootReducer,
        state,
        composeEnhancers(middlewares)     
    );

    sagaMiddleware.run(jobSagas);

    return store;
}

export function makeStore(hist) {
    return configureStore(initialState, hist);
}