import {call, put, select, takeLatest} from 'redux-saga/effects'
import {fetchToolsDetailsFailure, fetchToolsDetailsRequest, fetchToolsDetailsSuccess} from './toolsDetailsSlice'
import { fetchToolsData } from '../../services/wax/fetchToolsData'

function* fecthToolsSaga() {
    try{
        const session = yield select(state => state.auth.session);
        if(!session){
            throw new Error('No active session')
        }
        const contractName = 'p2ewgamelogi'
        const tools = yield call(fetchToolsData, session, contractName);
        yield put(fetchToolsDetailsSuccess(tools))
    } catch(error){
        console.log('Error fetching tools: ', error);
        yield put(fetchToolsDetailsFailure(error.toString()))
    }
}


export function* watchToolsDetails() {
    yield takeLatest(fetchToolsDetailsRequest.type, fecthToolsSaga)
}