import {createSlice} from '@reduxjs/toolkit';

const initialState = []

export const imageTypeSlice = createSlice({
    name: 'imageTypes',
    initialState,
    reducers: {
        addImageType: (state, action) => {
            state.push(action.payload);
        },
        setAll: (state, action) => {
            state = [];
            state = action.payload;
        }
    }

});

export default imageTypeSlice.reducer;