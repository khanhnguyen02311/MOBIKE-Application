import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    Cities: [],
    Districts: [],
    Wards: []
}

export const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setCities: (state, action) => {
            state.Cities = action.payload;
        },
        setDistricts: (state, action) => {
            state.Districts = action.payload;
        },
        setWards: (state, action) => {
            state.Wards = action.payload;
        }
    }
})

export default locationSlice.reducer;

export const {setCities, setDistricts, setWards} = locationSlice.actions;
