import { configureStore } from "@reduxjs/toolkit";

import { socketConnectionSlice } from "../slices/socketConnectionSlice";
import systemsReducer from "../slices/entitySlices/systemsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      socketConnection: socketConnectionSlice.reducer,
      systems: systemsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const store = makeStore();
