import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchTokensFailure, fetchTokensRequest, fetchTokensSuccess } from "./tokensSlice";
import { fetchTokensBalance } from "../../services/wax/tokens";
import { loginSuccess, restoreSessionSuccess } from "../auth/authSlice";

function* fetchTokens(){
    try{
        const session = yield select(state => state.auth.session);
        if(!session){
            throw new Error('No active session');
        }
        const contract = 'p2ewgametken'
        const tokens =["WOOD", "FOOD", "GOLD"]
        const balances = yield call(fetchTokensBalance, session, contract, tokens)
        yield put(fetchTokensSuccess(balances))
    }catch(error){
        console.error('Error fetching tokens: ', error)
        yield put(fetchTokensFailure())
    }
}

export function* watchTokens() {
    yield takeLatest(fetchTokensRequest.type, fetchTokens);
    yield takeLatest([loginSuccess.type, restoreSessionSuccess.type], function*() {
        yield put(fetchTokensRequest())
    })
}