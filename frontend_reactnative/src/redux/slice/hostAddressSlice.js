import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    hostAddress: null,
    initialState: false,
};

export const hostAddressSlice = createSlice({
    name: 'hostAddress',
    initialState,
    reducers: {
        setHostAddress: (state, action) => {
            state.hostAddress = action.payload.hostAddress;
            state.initialState = state.hostAddress != null;
        }
    }
});

export const {setHostAddress} = hostAddressSlice.actions;

export default hostAddressSlice.reducer;
