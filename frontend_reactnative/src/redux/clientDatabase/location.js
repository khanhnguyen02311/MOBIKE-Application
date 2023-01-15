import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    Cities: [],
    Districts: [],
    Wards: [],
    Tree: []
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
            // console.log("Set Distriscts finished: " + JSON.stringify(state.Districts))
        },
        setWards: (state, action) => {
            state.Wards = action.payload;
        },
        setTree: (state, action) => {
            state.Tree = action.payload;
            // console.log("Set tree finised: " + JSON.stringify(state.Tree))
        }
    }
})

export default locationSlice.reducer;

export const {setCities, setDistricts, setWards, setTree} = locationSlice.actions;
