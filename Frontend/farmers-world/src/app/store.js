import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import createSagaMiddleware from 'redux-saga'

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

export default store;