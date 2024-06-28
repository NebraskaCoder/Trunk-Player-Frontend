import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SocketConnectionState } from "@/types/state/SocketConnectionState";

import type { AppState } from "../store";

const initialState: SocketConnectionState = {
  isConnected: false,
};

export const socketConnectionSlice = createSlice({
  name: "socketConnection",
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
  extraReducers: (_builder) => {},
});

export const { setIsConnected } = socketConnectionSlice.actions;

export const selectIsSocketConnected = (state: AppState) =>
  state.socketConnection.isConnected;

export default socketConnectionSlice.reducer;
