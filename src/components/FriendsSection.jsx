import React from "react";

import { Box, Grid } from "@material-ui/core";

import "./css/friends.css";
const FriendsSearchBar = () => {
  return (
    <Grid item style={{ height: "8.33%" }}>
      <Box className="friends-section-box-wrapper">Searchbar</Box>
    </Grid>
  );
};

const FriendsList = () => {
  return (
    <Grid item style={{ height: "91.66%" }}>
      <Box className="friends-section-box-wrapper friends-list">FriendsList</Box>
    </Grid>
  );
};

const FriendsSection = () => {
  return (
    <Grid
      className="friends-section-container"
      container
      direction="column"
      xs={12}
      spacing={1}
      style={{ maxHeight: "100%", paddingLeft: 10 }}
    >
      <FriendsSearchBar />
      <FriendsList />
    </Grid>
  );
};

export default FriendsSection;
