import React, { useRef, useState } from "react";

import { Box, Grid, Tabs, Tab, makeStyles } from "@material-ui/core";

import {
  SearchFriendCard,
  FriendsSearchBar,
  FriendCard,
  FriendOptions,
} from "../assets/FriendAssets";

import styles from "./css/friends.module.css";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";

import {
  AddFriend,
  SearchForFriend,
  RemoveFriend
} from "./firestoreOperations/FriendOperations";

//Used to change MUI element
const useStyle = makeStyles({
  indicator: {
    backgroundColor: "white",
  },
});

//Three tabs and tabpanel below the search bar
const FriendsList = ({
  user,
  tabIndex,
  setTabIndex,
  searchResult,
  handleAddFriend,
  handleRemoveFriend,
}) => {
  //TabIndex 0=search 1=friends 2=server
  const classes = useStyle();
  return (
    <Grid item style={{ width: "100%", height: "91.66%" }}>
      <Box className={styles["section-wrapper"]}>
        <Tabs
          variant="fullWidth"
          className={styles["section-tabs"]}
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          aria-label="friends section tab"
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab label="Search" />
          <Tab label="Friends" />
          <Tab label="Server" />
        </Tabs>
        <Box
          className={`${styles["friends-list"]} ${styles["section-tabpanels"]}`}
        >
          <TabPanelSearch
            value={tabIndex}
            index={0}
            user={user}
            searchResult={searchResult}
            handleAddFriend={handleAddFriend}
          />
          <TabPanelFriendList
            value={tabIndex}
            index={1}
            user={user}
            handleRemoveFriend={handleRemoveFriend}
          />
          <TabPanel value={tabIndex} index={2} />
        </Box>
      </Box>
    </Grid>
  );
};

//Uses Generic Tab Panel and builds on top

//Panel dedicated to searching for friends
const TabPanelSearch = ({ index, value, searchResult, handleAddFriend }) => {
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

//Panel dedicated to current friends
const TabPanelFriendList = ({ index, value, user}) => {
  const { friends: friendsList } = user;

  const [optionsAnchor, setOptionsAnchor] = useState(null);
  const selectedFriend = useRef(null);

  const handleOpenOptions = (e, friend) => {
    setOptionsAnchor(e.currentTarget);
    selectedFriend.current = friend;
  };

  const handleCloseOptions = () => {
    setOptionsAnchor(null);
    selectedFriend.current = null;
  };

  const handleRemoveFriend = (friend) => {
    
    RemoveFriend(friend, user).then(success => {
      if(success){
        handleCloseOptions();
      }
    });
    
  };

  const open = Boolean(optionsAnchor);
  const id = open ? "friend-options-popover" : undefined;

  return (
    <TabPanel index={index} value={value}>
      {friendsList && friendsList.length > 0 ? (
        friendsList.map((friend, i) => (
          <FriendCard
            key={i}
            friendInfo={friend}
            handleOpenOptions={handleOpenOptions}
          ></FriendCard>
        ))
      ) : (
        <div>Empty</div>
      )}
      <FriendOptions
        id={id}
        anchor={optionsAnchor}
        open={open}
        friend={selectedFriend.current}
        handleClose={handleCloseOptions}
        handleRemoveFriend={handleRemoveFriend}
      />
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
    AddFriend(user, friend).then(success => {
      if (success) {
        setSearchResult({}); // reset results
        setTabIndex(1); // swap over to friendslist
      }
    });
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
