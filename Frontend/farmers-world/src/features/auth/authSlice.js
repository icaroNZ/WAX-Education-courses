import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    isLoggedIn: false,
    isLoading: false,
    session: undefined,
    actor: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginRequest: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.isLoading = false;
            state.session = action.payload;
            state.actor = action.payload.permissionLevel.actor.toString();
        },
        loginFailure: (state) => {
            state.isLoading = false; 
        },
        logoutRequest: (state) => {
            state.isLoading = true;
        },
        logoutSucess: (state) => {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.session = undefined;
            state.actor = undefined;
        },
        logoutFailure: (state) => {
            state.isLoading = false;
        },
        restoreSessionRequest: (state) => {
            state.isLoading = true;
        },
        restoreSessionSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.isLoading = false;
            state.session = action.payload;
            state.actor = action.payload.permissionLevel.actor.toString();
        },
        restoreSessionFailure: (state) => {
            state.isLoading = false; 
        },
    }
})

export const { 
    loginSuccess, 
    logoutSucess, 
    restoreSessionSuccess,
    loginRequest, 
    logoutRequest, 
    restoreSessionRequest,
    loginFailure, 
    logoutFailure, 
    restoreSessionFailure } = authSlice.actions

export default authSlice.reducer;