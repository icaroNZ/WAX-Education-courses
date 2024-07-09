import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    energy: 0,
    maxEnergy: 0,
    balances: {},
    isLoading: false,
    error: undefined
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        fetchUserDetailsRequest:(state) => {
            state.isLoading = true;
            state.error = undefined;
        },
        fetchUserDetailsSuccess:(state, action) => {
            state.isLoading = false;
            state.energy = action.payload.energy;
            state.maxEnergy = action.payload.maxEnergy;
            state.balances = action.payload.balances;
        },
        fetchUserDetailsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const {fetchUserDetailsRequest, fetchUserDetailsSuccess, fetchUserDetailsFailure} = userSlice.actions;
export default userSlice.reducer