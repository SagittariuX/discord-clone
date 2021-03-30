import React, { useState } from "react";

import { Box, Grid, InputBase, Paper, Tabs, Tab } from "@material-ui/core";

import { SearchFriendCard } from "../assets/FriendAssets";

import "./css/friends.css";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";

import firestore from "../redux/Firebase";

//search bar above the friends section
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

//Three tabs and tabpanel below the search bar
const FriendsList = ({ tabIndex, setTabIndex, searchResult }) => {
  //TabIndex 0=search 1=friends 2=server
  return (
    <Grid item style={{ width: "100%", height: "91.66%" }}>
      <Box className="friends-section-wrapper">
        <Tabs
          variant="fullWidth"
          className="friends-section-tabs"
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="friends section tab"
        >
          <Tab label="Search" />
          <Tab label="Friends" />
          <Tab label="Server" />
        </Tabs>
        <Box className="friends-list friends-section-tabpanels">
          <TabPanelSearch
            value={tabIndex}
            index={0}
            searchResult={searchResult}
          />
          <TabPanel value={tabIndex} index={1} />
          <TabPanel value={tabIndex} index={2} />
        </Box>
      </Box>
    </Grid>
  );
};

const TabPanelSearch = ({ index, value, searchResult }) => {
  const user = useSelector(selectUser);
  return (
    <TabPanel index={index} value={value}>
      {searchResult ? (
        <SearchFriendCard
          handleAccept={(e) => console.log(e)}
          searchResult={searchResult}
        />
      ) : (
        <div>No Results</div>
      )}
    </TabPanel>
  );
};

const TabPanel = ({ index, value, children }) => {
  return (
    <Box role="tabpanel" hidden={index !== value}>
      {children}
    </Box>
  );
};

const FriendsSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [tabIndex, setTabIndex] = useState(1); // 0 = Search 1 = Friends 2 = Server

  //Firebase query to find friends
  const handleSearchSubmit = (e) => {
    const trimSearchInput = searchInput.trim();
    if (!trimSearchInput) return;
    if (e.keyCode === 13) {
      //enter
      firestore
        .collection("users")
        .where("email", "==", trimSearchInput)
        .limit(1)
        .get()
        .then((res) => {
          if (res.empty) {
            setSearchResult(null);
            return;
          }
          res.forEach((doc) => {
            setSearchResult({ ...doc.data(), docId: doc.id });
          });
        })
        .catch((err) => console.log(err));

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
        searchResult={searchResult}
      />
    </Grid>
  );
};

export default FriendsSection;
