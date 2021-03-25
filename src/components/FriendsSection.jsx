import React, { useState } from "react";

import { Box, Grid, InputBase, Paper, Tabs, Tab } from "@material-ui/core";

import "./css/friends.css";
const FriendsSearchBar = ({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
}) => {
  return (
    <Grid
      item
      container
      alignItems="center"
      justify="center"
      style={{ height: "8.33%" }}
    >
      <Paper className="friends-search-bar">
        <InputBase
          className="friends-search-input-bar"
          fullWidth
          value={searchInput}
          placeholder="Search for friends by gmail"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={(e) => handleSearchSubmit(e)}
        />
      </Paper>
    </Grid>
  );
};

const FriendsList = ({tabIndex, setTabIndex}) => {
  return (
    <Grid item style={{ width: '100%', height: "91.66%" }}>
      <Box className='friends-section-wrapper'>
      <Tabs
          variant="fullWidth"
          className='friends-section-tabs'
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="friends section tab"
        >
          <Tab label="Search" />
          <Tab label="Friends" />
          <Tab label="Server" />
        </Tabs>
      <Box className="friends-list friends-section-tabpanels">
        <TabPanel value={tabIndex} index={0}/>
        <TabPanel value={tabIndex} index={1}/>
        <TabPanel value={tabIndex} index={2}/>


      </Box>
      </Box>
    </Grid>
  );
};

const TabPanel = ({ index, value, component }) => {
  return (
    <Box role="tabpanel" hidden={index !== value}>
      {index}
    </Box>
  );
};

const FriendsSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [tabIndex, setTabIndex] = useState(1);// 0 = Search 1 = Friends 2 = Server

  const handleSearchSubmit = (e) => {
    if (e.keyCode === 13) {
      //enter
      console.log(searchInput);
      setTabIndex(0);
      setSearchInput("");
    }
  };

  return (
    <Grid
      className="friends-section-container"
      container
      item
      direction="column"
      xs={12}
      spacing={0}
    >
      <FriendsSearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchSubmit={handleSearchSubmit}
      />
      <FriendsList 
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
    </Grid>
  );
};

export default FriendsSection;
