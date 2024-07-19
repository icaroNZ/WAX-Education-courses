import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import tokensReducer from '../features/tokens/tokensSlice'
import userReducer from '../features/user/userSlice'
import toolsDetailsReducer from '../features/tools/toolsDetailsSlice'
import userToolsReducer from '../features/userTools/userToolsSlice'
import nftActionsReducer from '../features/actions/nftActionsSlice'
import createSagaMiddleware from 'redux-saga'
import { watchLoginStatus } from '../features/auth/authSaga';
import { watchTokens } from '../features/tokens/tokensSaga';
import { all } from 'redux-saga/effects';
import { watchUserDetails } from '../features/user/userSaga'
import { watchToolsDetails } from '../features/tools/toolsDetailsSaga'
import { watchUserTools } from '../features/userTools/userToolsSaga'
import { watchNftActions } from '../features/actions/nftActionsSaga'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        auth: authReducer,
        tokens: tokensReducer,
        user: userReducer,
        toolsDetails: toolsDetailsReducer,
        userTools: userToolsReducer,
        nftActions: nftActionsReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware)
    },
    devTools: process.env.NODE_ENV !== 'production'
})

function* rootSaga(){
    yield all([
        watchLoginStatus(),
        watchTokens(),
        watchUserDetails(),
        watchToolsDetails(),
        watchUserTools(),
        watchNftActions(),
    ])
}

sagaMiddleware.run(rootSaga)
export default store;