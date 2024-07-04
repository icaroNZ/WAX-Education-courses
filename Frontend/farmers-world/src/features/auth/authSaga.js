import {delay, put, takeLeading} from 'redux-saga/effects'
import { login, loginRequest, logout, logoutRequest } from './authSlice'

function* handleLogin(){
    try{
        yield delay(1000)
        yield put(login())
    }catch{
        console.log('error')
    }
}

function* handleLogout(){
    try{
        yield delay(1000)
        yield put(logout())
    }catch{
        console.log('error')
    }
}

export function* watchLoginStatus(){
    yield takeLeading(loginRequest.type, handleLogin);
    yield takeLeading(logoutRequest.type, handleLogout)
}