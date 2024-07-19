import { call, put, select, takeLatest } from 'redux-saga/effects'
import { claimNftFailure, claimNftRequest, claimNftSuccess } from './nftActionsSlice'
import { claimNft } from '../../services/wax/claimNft';
import {fetchUserToolsRequest} from '../userTools/userToolsSlice'
import {fetchUserDetailsRequest} from '../user/userSlice'

function* claimNftSaga(action){
    try{
        const session = yield select(state => state.auth.session);
        if(!session){
            throw new Error('No session found')
        }
        const result = yield call(claimNft, session, action.payload);
        yield put(claimNftSuccess(result));
        yield put(fetchUserToolsRequest());
        yield put(fetchUserDetailsRequest());
    } catch(error){
        console.error('Error claiming nft: ', error);
        yield put(claimNftFailure(error.toString()));
    }
}

export function* watchNftActions(){
    yield takeLatest(claimNftRequest.type, claimNftSaga)
}