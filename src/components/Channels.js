import { Card, Grid } from "@material-ui/core";
import React from "react";
import "./css/channels.css";

const Channels = () => {
  return (
    <Grid className="channel-content-container" container direction="column">
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
      <ChannelSelect />
    </Grid>
  );
};

export default Channels;

const ChannelSelect = () => {
  return <Card className="channel-icon">Card</Card>;
};
