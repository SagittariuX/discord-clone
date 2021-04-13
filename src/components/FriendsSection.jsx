import React, { useState } from "react";

import { Box, Grid, InputBase, Paper, Tabs, Tab } from "@material-ui/core";

import { SearchFriendCard } from "../assets/FriendAssets";

import styles from "./css/friends.module.css";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";

import {
  AddFriend,
  SearchForFriend,
} from "./firestoreOperations/FriendOperations";

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
      <Paper className={styles["search-bar"]}>
        <InputBase
          className={styles["search-input-bar"]}
          fullWidth
          value={searchInput}
          placeholder="Search for friends by gmail"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter") handleSearchSubmit();
          }}
        />
      </Paper>
    </Grid>
  );
};

//Three tabs and tabpanel below the search bar
const FriendsList = ({
  user,
  tabIndex,
  setTabIndex,
  searchResult,
  handleAddFriend,
}) => {
  //TabIndex 0=search 1=friends 2=server
  return (
    <Grid item style={{ width: "100%", height: "91.66%" }}>
      <Box className={styles["section-wrapper"]}>
        <Tabs
          variant="fullWidth"
          className={styles["section-tabs"]}
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="friends section tab"
        >
          <Tab label="Search" />
          <Tab label="Friends" />
          <Tab label="Server" />
        </Tabs>
        <Box className={`${styles['friends-list']} ${styles['section-tabpanels']}`}>
          <TabPanelSearch
            value={tabIndex}
            index={0}
            user={user}
            searchResult={searchResult}
            handleAddFriend={handleAddFriend}
          />
          <TabPanel value={tabIndex} index={1} />
          <TabPanel value={tabIndex} index={2} />
        </Box>
      </Box>
    </Grid>
  );
};

//Uses Generic Tab Panel and builds on top
const TabPanelSearch = ({
  index,
  value,
  user,
  searchResult,
  handleAddFriend,
}) => {
  return (
    <TabPanel index={index} value={value}>
      {searchResult && Object.keys(searchResult).length > 0 ? (
        <SearchFriendCard
          handleAccept={handleAddFriend}
          searchResult={searchResult}
        />
      ) : (
        <div>No Results</div>
      )}
    </TabPanel>
  );
};

//Generic Panel
const TabPanel = ({ index, value, children }) => {
  return (
    <Box role="tabpanel" hidden={index !== value}>
      {children}
    </Box>
  );
};

const FriendsSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [tabIndex, setTabIndex] = useState(1); // 0 = Search 1 = Friends 2 = Server
  const user = useSelector(selectUser);

  //Finding Friend via Email
  const handleSearchSubmit = () => {
    const { email: userEmail, friends: friendsList } = user;
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const trimSearchInput = searchInput.trim();
    if (!trimSearchInput) return;

    const checkValidEmail = () => {
      if (!mailformat.test(trimSearchInput)) {
        alert("Please enter a valid email");
        return false;
      }

      if (trimSearchInput === userEmail) {
        alert("Hey thats you!");
        return false;
      }

      const found = friendsList.find(({ email }) => email === trimSearchInput);
      if (found) {
        alert("Already on your friends' list");
        return false;
      }

      return true;
    };

    //enter
    if (checkValidEmail()) {
      SearchForFriend(trimSearchInput, setSearchResult);
    }
    setTabIndex(0);
    setSearchInput("");
  };

  const handleAddFriend = (friend) => {
    const success = AddFriend(user, friend);
    if (success) {
      setSearchResult({}); // reset results
      setTabIndex(1); // swap over to friendslist
    }
  };

  return (
    <Grid
      className={styles["section-container"]}
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
        user={user}
        searchResult={searchResult}
        handleAddFriend={handleAddFriend}
      />
    </Grid>
  );
};

export default FriendsSection;
