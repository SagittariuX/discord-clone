import React from "react";

import { Paper, Grid } from "@material-ui/core";
import "./css/servers.css";

const ServerName = () => {
  return (
    <Grid item style={{ height: "16.66%" }}>
      <Paper className="server-detail-paper-wrapper " elevation={0}>
        ServerName
      </Paper>
    </Grid>
  );
};

const ServerChannels = () => {
  return (
    <Grid item style={{ height: "75%" }}>
      <Paper className="server-detail-paper-wrapper server-detail-channel" elevation={0}>
        Channels
      </Paper>
    </Grid>
  );
};

const UserInterface = () => {
  return(
    <Grid item style={{ height: "8.33%" }}>
      <Paper className="server-detail-paper-wrapper" elevation={0}>
        UserInterface
      </Paper>
    </Grid>
  )
}

const ServerDetail = () => {
  return (
    <>
      <Grid
        className="server-detail-container"
        container
        direction="column"
        xs={12}
        spacing={1}
        style={{ maxHeight: "100%" }}
      >
        <ServerName />
        <ServerChannels />
        <UserInterface />
      </Grid>
    </>
  );
};

export default ServerDetail;
