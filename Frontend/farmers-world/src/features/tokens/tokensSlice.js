import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    WOOD: '0.0000',
    GOLD: '0.0000',
    FOOD: '0.0000',
    isLoading: false,
    error: null
}

export const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        fetchTokensRequest:(state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchTokensSuccess:(state, action) => {
            state.isLoading = false;
            state.WOOD = action.payload.WOOD || state.WOOD;
            state.FOOD = action.payload.FOOD || state.FOOD;
            state.GOLD = action.payload.GOLD || state.GOLD;
        },
        fetchTokensFailure:(state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const {fetchTokensRequest, fetchTokensSuccess, fetchTokensFailure} = tokensSlice.actions;

export default tokensSlice.reducer;