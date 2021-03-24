import { createSlice } from "@reduxjs/toolkit";

export const serversSlice = createSlice({
  name: "servers",
  initialState: {
    servers: [],
    currentServer: null,
  },
  reducers: {
    addServer: (state, action) => {
      state.servers = [...state.servers, action.payload];
      if (!state.currentServer) state.currentServer = action.payload; // by default take the first one
    },
    setCurrentServer: (state, action) => {
      state.currentServer = action.payload;
    },
    resetServerList: (state) => {
      state.servers = [];
    },
    resetServersInfo: (state) => {
      state.servers = [];
      state.currentServer = null;
    },
  },
});

export const {
  addServer,
  setCurrentServer,
  resetServerList,
  resetServersInfo,
} = serversSlice.actions;

export const selectServers = (state) => state.servers.servers;

export const selectCurrentServer = (state) => state.servers.currentServer;

export default serversSlice.reducer;
