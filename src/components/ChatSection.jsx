import React from "react";

import { Grid, Box } from "@material-ui/core";

import "./css/chat.css";

const ChannelHeader = () => {
  return (
    <Grid item style={{ height: "8.33%" }}>
      <Box className="chat-section-box-wrapper">ChannelHeader</Box>
    </Grid>
  );
};

const ChatInput = () => {
  return (
    <Grid item style={{ height: "8.33%" }}>
      <Box className="chat-section-box-wrapper">ChatInput</Box>
    </Grid>
  );
};

const ChatLogs = () => {
  return (
    <Grid item style={{ height: "83.33%" }}>
      <Box className="chat-section-box-wrapper chat-logs">ChatLogs</Box>
    </Grid>
  );
};

const ChatSection = () => {
  return (
    <Grid
      className="friends-section-container"
      container item
      direction="column"
      xs={12}
      spacing={1}
      style={{ maxHeight: "100%", paddingLeft: 10 }}
    >
      <ChannelHeader />
      <ChatLogs />
      <ChatInput />
    </Grid>
  );
};

export default ChatSection;
