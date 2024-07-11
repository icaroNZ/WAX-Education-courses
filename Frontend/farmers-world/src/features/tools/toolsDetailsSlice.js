import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    tools: {},
    isLoading: false,
    error: undefined
};

export const toolsDetailsSlice = createSlice({
    name: 'tools',
    initialState,
    reducers:{ 
        fetchToolsDetailsRequest: (state) => {
            state.isLoading = true;
            state.error = undefined;
        },
        fetchToolsDetailsSuccess:(state, action) => {
            state.isLoading = false;
            state.tools = action.payload
        },
        fetchToolsDetailsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
});

export const { fetchToolsDetailsRequest, fetchToolsDetailsSuccess, fetchToolsDetailsFailure } = toolsDetailsSlice.actions

export default toolsDetailsSlice.reducer;