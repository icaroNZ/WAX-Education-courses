import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchUserDetailsFailure, fetchUserDetailsRequest, fetchUserDetailsSuccess } from "./userSlice";
import { fetchUserDetails } from "../../services/wax/userDetails";
import { loginSuccess, restoreSessionSuccess } from "../auth/authSlice";

function* fetchUserDetailsSaga(){
    try{
        const session = yield select(state => state.auth.session);
        if(!session){
            throw new Error('No active session');
        }
        const contractName = 'p2ewgamelogi';
        const tokens = ['WOOD', 'FOOD', 'GOLD'];
        const userDetails = yield call(fetchUserDetails, session, contractName, tokens)
        yield put(fetchUserDetailsSuccess(userDetails))
    } catch(error){
        console.error('Error fetching user details: ', error);
        yield put(fetchUserDetailsFailure(error.toString()))
    }
}

export function* watchUserDetails(){
    yield takeLatest(fetchUserDetailsRequest.type, fetchUserDetailsSaga);
    yield takeLatest([loginSuccess.type, restoreSessionSuccess.type], function* () {
        yield put(fetchUserDetailsRequest())
    })
}