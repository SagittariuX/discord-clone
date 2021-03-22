import React from "react";

import { Grid } from "@material-ui/core";
import "./css/main.css";

import Servers from "./Servers";
import ServerDetail from './ServerDetail';
import FriendsSection from './FriendsSection';
import ChatSection from './ChatSection'

const Main = () => {
  return (
    <>
      <Grid className="App" container xs={12}>
        <Grid className="servers-wrapper" container item xs={1}>
          <Servers />
        </Grid>

        <Grid className="server-detail-wrapper" container item xs={2}>
          <ServerDetail/>
        </Grid>
        <Grid className="chat-wrapper" container item xs={6}>
         <ChatSection /> 
        </Grid>
        <Grid className="friends-list-wrapper" container item xs={3}>
          <FriendsSection/>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
