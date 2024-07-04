import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    isLoggedIn: false,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginRequest: (state) => {
            state.isLoading = true;
        },
        login: (state) => {
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        logoutRequest: (state) => {
            state.isLoading = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.isLoading = false;

        }
    }
})

export const { login, logout, loginRequest, logoutRequest } = authSlice.actions

export default authSlice.reducer;