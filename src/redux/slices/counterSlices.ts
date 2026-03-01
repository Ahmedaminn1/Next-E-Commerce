import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },

    decrement: (state) => {
      state.count -= 1;
    },

    increametByAmount : (state , action:PayloadAction<number>)=>{
        state.count += action.payload
    }
  },
});

export const counterReducer = counterSlice.reducer;
export const {increment , decrement ,increametByAmount} = counterSlice.actions