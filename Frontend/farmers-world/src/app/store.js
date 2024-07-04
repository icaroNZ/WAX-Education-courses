import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import createSagaMiddleware from 'redux-saga'
import { watchLoginStatus } from '../features/auth/authSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware)
    },
    devTools: process.env.NODE_ENV !== 'production'
})

sagaMiddleware.run(watchLoginStatus)
export default store;