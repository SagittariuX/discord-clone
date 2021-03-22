import { Card, Grid } from "@material-ui/core";
import React from "react";
import "./css/servers.css";

const ServerSelect = () => {
  return <Card className="servers-icon">Card</Card>;
};


const Servers = () => {
  return (
    <Grid className="servers-content-container" container direction="column">
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
      <ServerSelect />
    </Grid>
  );
};

export default Servers;

