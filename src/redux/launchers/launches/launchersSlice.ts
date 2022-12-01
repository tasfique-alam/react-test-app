import { createSlice } from '@reduxjs/toolkit';
import { getLaunchers } from './launchersActions';

export interface LaunchersState {
    loading: boolean;
    success: boolean,
    error: string | null,
    message?: string | null,
    data: any;
}

const initialState: LaunchersState = {
    loading: false,
    success: false,
    error: null,
    message: null,
    data: []
}

export const launchersSlice = createSlice({
    name: 'launchers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLaunchers.pending, (state: LaunchersState, _action) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        })
        builder.addCase(getLaunchers.fulfilled, (state: LaunchersState, action) => {
            state.loading = false;
            state.success = true;
            state.error = action.payload.error;
            state.message = action.payload.message;
            state.data = action.payload;
        })
        builder.addCase(getLaunchers.rejected, (state: LaunchersState, action) => {
            const payload = action.payload as LaunchersState;
            state.success = false;
            state.loading = false;
            state.error = payload.error;
            state.message = payload.message;
        })
    }
});

export default launchersSlice.reducer;