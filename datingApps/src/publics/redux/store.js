import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from "redux-thunk"

import reducers from './reducers'

const logger = createLogger({})

const store = createStore(
    reducers,
    applyMiddleware(
        logger,
        promiseMiddleware,
        thunk
    )
);
export default store