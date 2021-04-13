import React from "react";

import CheckIcon from "@material-ui/icons/Check";

import {Avatar ,Card, CardContent, IconButton, makeStyles, Grid, Paper, InputBase } from "@material-ui/core";

//All global variables are stored in components/css/main.css
const cardStyles = makeStyles(() => ({
  searchFriendCard: {
    display: "flex",
    height: '100%',
    margin: '10px 0 10px 0',
    backgroundColor: 'var(--friend-card-background-color)',
    color: 'var(--friend-card-font-color)',
  },
  searchFriendPhoto: {
    flex: 1,
    height: '100%',
  },
  searchFriendDetails: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
  },
  searchFriendCheck: {
    flex: 1,
    color: 'lightgreen',
    backgroundColor: 'green',
    borderRadius: 0,
    '&:hover' :{
        backgroundColor: 'darkgreen',
    }
  },
}));

/**
 * View component for TabPanelSearch
 * @prop {function} handleAccept
 * @prop {Object} searchResult 
 */
const SearchFriendCard = ({ handleAccept, searchResult }) => {
  const classes = cardStyles();
  const {displayName, email, photo} = searchResult;
  return (
    <Card className={classes.searchFriendCard}>
      <Avatar className={classes.searchFriendPhoto} alt={displayName} src={photo} />
      <CardContent className={classes.searchFriendDetails}>
        <div>{displayName}</div>
        <div>{email}</div>
      </CardContent>
      <IconButton className={classes.searchFriendCheck} onClick={() => handleAccept(searchResult)}>
        <CheckIcon />
      </IconButton>
    </Card>
  );
};

export {SearchFriendCard};





const searchBarStyles = makeStyles(() => ({

}));

/**
 * Search bar asset used to look up friends
 * @param {string} searchInput
 * @param {function} setSearchInput
 * @param {function} handleSearchSubmit 
 */
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
          onKeyDown={(e) => {
            if (e.code === "Enter") handleSearchSubmit();
          }}
        />
      </Paper>
    </Grid>
  );
};