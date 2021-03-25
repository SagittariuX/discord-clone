import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/UserSlice";
import serversReducer from "../redux/ServerSlice";
import channelReducer from "../redux/ChannelSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    servers: serversReducer,
    channels: channelReducer,
  },
});
