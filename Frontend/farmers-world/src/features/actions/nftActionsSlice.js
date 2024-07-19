import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    error: null,
    lastTransaction: null
}
const nftActionsSlice = createSlice ({
    name: 'nftActions',
    initialState,
    reducers: {
        claimNftRequest: (state, action) => {
            console.log(action)
            state.isLoading = true;
            state.error = null;
            state.lastTransaction = null;
        },
        claimNftSuccess: (state, action) => {
            state.isLoading = false;
            state.lastTransaction = action.payload
        },
        claimNftFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearNftTransaction: (state) => {
            state.lastTransaction = null;
            state.error = null
        }
    }
})

export const {
    claimNftRequest,
    claimNftSuccess,
    claimNftFailure,
    clearNftTransaction
} = nftActionsSlice.actions

export default nftActionsSlice.reducer