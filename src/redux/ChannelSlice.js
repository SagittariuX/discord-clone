import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
  name: "channels",
  initialState: {
    channels: [],
    currentChannel: null,
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    resetChannelInfo: (state) => {
      state.channels = [];
      state.currentChannel = null;
    },
  },
});

export const {
  setChannels,
  setCurrentChannel,
  resetChannelInfo,
} = channelSlice.actions;

export const selectChannels = (state) => state.channels.channels;

export const selectCurrentChannel = (state) => state.channels.currentChannel;

export default channelSlice.reducer;
