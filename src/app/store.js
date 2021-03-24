import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/UserSlice";
import serversReducer from "../redux/ServerSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    servers: serversReducer,
  },
});
