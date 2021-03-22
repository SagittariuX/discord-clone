import React from "react";

import {Box, Grid } from "@material-ui/core";
import "./css/servers.css";

const ServerName = () => {
  return (
    <Grid item style={{ height: "16.66%" }}>
      <Box className="server-detail-box-wrapper ">
        ServerName
      </Box>
    </Grid>
  );
};

const ServerChannels = () => {
  return (
    <Grid item style={{ height: "75%" }}>
      <Box className="server-detail-box-wrapper server-detail-channel">
        Channels
      </Box>
    </Grid>
  );
};

const UserInterface = () => {
  return(
    <Grid item style={{ height: "8.33%" }}>
      <Box className="server-detail-box-wrapper" elevation={0}>
        UserInterface
      </Box>
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
