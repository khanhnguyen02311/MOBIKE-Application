import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    Citys: [],
    Districts: [],
    Wards: []
}

export const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setCity: (state, action) => {

        }
    }
})
