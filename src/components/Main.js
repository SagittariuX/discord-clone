import React from "react";

import { Grid } from "@material-ui/core";
import "./css/main.css";

import Channels from "./Channels";

const Main = () => {
  return (
    <>
      <Grid className="App" container xs={12}>
        <Grid
          className="channels-wrapper"
          container
          item
          xs={1}
          direction="column"
        >
          <Channels />
        </Grid>

        <Grid
          className="server-wrapper"
          container
          item
          xs={2}
          direction="column"
        >
          Server Info
        </Grid>
        <Grid className="chat-wrapper" container item xs={6} direction="column">
          Chat Log
        </Grid>
        <Grid
          className="friends-list-wrapper"
          container
          item
          xs={3}
          direction="column"
        >
          Friend List
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
