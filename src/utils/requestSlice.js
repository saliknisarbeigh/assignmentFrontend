import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,

    // Remove a request by _id
    removeRequest: (state, action) => {
      if (!state) return null;
      return state.filter((req) => req._id !== action.payload);
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
