import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ID: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.ID = action.payload.ID;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
