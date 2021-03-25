import { createSlice } from "@reduxjs/toolkit";

export const serversSlice = createSlice({
  name: "servers",
  initialState: {
    servers: [],
    currentServer: null,
  },
  reducers: {
    setServers: (state, action) => {
      state.servers = action.payload;
    },
    setCurrentServer: (state, action) => {
      state.currentServer = action.payload;
    },
    addServer: (state, action) => {
      state.servers.push(action.payload);
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
  setServers,
  setCurrentServer,
  addServer,
  resetServerList,
  resetServersInfo,
} = serversSlice.actions;

export const selectServers = (state) => state.servers.servers;

export const selectCurrentServer = (state) => state.servers.currentServer;

export default serversSlice.reducer;
