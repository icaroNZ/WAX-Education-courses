import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userTools: {},
    isLoading: false,
    error: null
}

export const userToolsSlice = createSlice({
    name: 'userTools',
    initialState,
    reducers: {
        fetchUserToolsRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        fetchUserToolsSuccess: (state, action) => {
            state.isLoading = false;
            state.userTools = action.payload
        },
        fetchUserToolsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
});

export const {
    fetchUserToolsRequest,
    fetchUserToolsSuccess,
    fetchUserToolsFailure
} = userToolsSlice.actions

export default userToolsSlice.reducer;