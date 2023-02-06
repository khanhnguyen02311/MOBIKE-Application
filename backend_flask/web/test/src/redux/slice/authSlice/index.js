import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: undefined,
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        test: (state, action) => {
            state.token = action.payload
        }
    }
});

export const { test } = AuthSlice.actions

export default AuthSlice.reducer