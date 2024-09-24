import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  flights: object[];
  myFlights: object[];
}

const initialState: CounterState = {
  flights: [],
  myFlights: [],
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setMyFlights: (state, action) => {
      state.myFlights = action.payload;
    },
  },
});

export const { setFlights, setMyFlights } = flightsSlice.actions;

export default flightsSlice.reducer;
