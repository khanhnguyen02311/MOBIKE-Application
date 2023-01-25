import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  vehicleTypes: [],
  priceRange: {
    min: 0,
    max: 0,
    minPosition: 0,
    maxPosition: 0,
  },
  minMaxText: {
    min: 0,
    max: 0,
  },
  manufacturer: []
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setVehicleTypesAdd: (state, action) => {
      state.vehicleTypes.push(action.payload);
      console.log(state.vehicleTypes);
    },
    setVehicleTypesRemove: (state, action) => {
      let index = state.vehicleTypes.indexOf(action.payload);
      state.vehicleTypes.splice(index, 1);
    },
    setPriceRange: (state, action) => {
      state.priceRange.min = action.payload.min;
      state.priceRange.max = action.payload.max;
      state.priceRange.minPosition = action.payload.minPosition;
      state.priceRange.maxPosition = action.payload.maxPosition;
    },
    setMinMaxText: (state, action) => {
      state.minMaxText.min = action.payload.min;
      state.minMaxText.max = action.payload.max;
    },
    setManufacturer: (state, action) => {
      let flag = false;
      let temp = action.payload.manufacturer;
      for (let i = 0; i <= state.manufacturer.length - 1; i++) {
        if (state.manufacturer[i].id === temp.id) {
          if (temp.value.length === 0) state.manufacturer.splice(i, 1);
          else {
            state.manufacturer[i].value = temp.value;
            flag = true;
          }
          break;
        }
      }
      if (!flag)
        state.manufacturer.push(temp);
    },

    setInitial: () => {
      return initialState;
    },
  },
});

export const {
  setName,
  setVehicleTypesAdd,
  setVehicleTypesRemove,
  setPriceRange,
  setMinMaxText,
  setManufacturer,
  setInitial,
} = filterSlice.actions;
export default filterSlice.reducer;
