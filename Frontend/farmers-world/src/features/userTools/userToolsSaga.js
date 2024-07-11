import { call, put, select, takeLatest } from 'redux-saga/effects'
import { fetchUserToolsRequest, fetchUserToolsSuccess } from './userToolsSlice'
import { fetchUserTools } from '../../services/wax/fetchUserTools'
import { fetchUserDetailsRequest } from '../user/userSlice'
import { fetchToolsDetailsFailure } from '../tools/toolsDetailsSlice';
import { loginSuccess, restoreSessionSuccess } from '../auth/authSlice';

function* fetchUserToolsSaga(){
    try{
        const session = yield select(state => state.auth.session);
        if(!session){
            throw new Error('No active session');
        }
        const contractName = "p2ewgamelogi"
        const userTools = yield call(fetchUserTools, session, contractName);
        yield put(fetchUserToolsSuccess(userTools))
    }catch(error){
        console.error('Error fetching user tools:', error);
        yield put(fetchToolsDetailsFailure(error.toString()));
    }
}

export function* watchUserTools(){
    yield takeLatest(fetchUserToolsRequest.type, fetchUserToolsSaga);
    yield takeLatest([loginSuccess.type, restoreSessionSuccess.type], function* () {
        yield put(fetchUserToolsRequest())
    })
}