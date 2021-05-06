import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promise from 'redux-promise-middleware'
import promiseMiddleware from 'redux-promise-middleware'
import authReducer from './authReducer'

export default createStore(
    authReducer,
    composeWithDevTools(applyMiddleware(promiseMiddleware))
)