import { put, takeLeading, call} from 'redux-saga/effects'
import { loginSuccess, loginRequest, logoutSucess, logoutRequest, loginFailure, logoutFailure, restoreSessionRequest, restoreSessionSuccess, restoreSessionFailure } from './authSlice'
import {login, logout, restore} from '../../services/wax/wax'
function* handleLogin(){
    try{
        const session = yield call(login)
        yield put(loginSuccess(session))
    }catch{
        console.log('error')
        loginFailure();
    }
}

function* handleLogout(){
    try{
        yield call(logout)
        yield put(logoutSucess())
    }catch{
        console.log('error')
        logoutFailure();
    }
}

function* handleRestoreSession(){
    try{
        const session = yield call(restore);
        if(session){
            yield put(restoreSessionSuccess(session))
        } else {
            yield put(restoreSessionFailure())
        }
    } catch(error){
        console.log('Error restoring the session: ', error)
        yield put(restoreSessionFailure())
    }
}

export function* watchLoginStatus(){
    yield takeLeading(loginRequest.type, handleLogin);
    yield takeLeading(logoutRequest.type, handleLogout);
    yield takeLeading(restoreSessionRequest.type, handleRestoreSession)
}