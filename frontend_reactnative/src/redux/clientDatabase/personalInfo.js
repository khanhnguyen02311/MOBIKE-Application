import { createSlice } from '@reduxjs/toolkit';
import { State } from 'react-native-gesture-handler';

const initialState = {
    Birthdate: undefined,
    Gender: undefined,
    Identification_number: undefined,
    Name: undefined,
    Phone_number: undefined,
    Addresses: {}
}

export const personalInfoSlice = createSlice({
    name: 'personalInfo',
    initialState,
    reducers: {
        setBirthdate: (state, action) => {
            state.Birthdate = action.payload;
        },
        setGender: (state, action) => {
            state.Gender = action.payload;
        },
        setIndentification_number: (state, action) => {
            state.Indentification_number = action.payload;
        },
        setName: (state, action) => {
            state.Name = action.payload;
        },
        setPhone_number: (state, action) => {
            state.Phone_number = action.payload;
        },
        setAddress: (state, action) => {
            state.Address = action.payload;
        },
        setAll: (state, action) => {
            try {
                state.Birthdate = action.payload.Birthdate || undefined;
                state.Gender = action.payload.Gender || undefined;
                state.Indentification_number = action.payload.Indentification_number || undefined;
                state.Name = action.payload.Name || undefined;
                state.Phone_number = action.payload.Phone_number || undefined;
                state.Addresses = action.payload.Addresses || undefined;
            } catch (error) {
                console.log("Error: " + error);
            }
        }
    }
})

export default personalInfoSlice.reducer;

export const { setBirthdate, setGender, setIndentification_number, setName, setPhone_number, setAddress, setAll } = personalInfoSlice.actions;