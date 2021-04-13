import React from "react";

import CheckIcon from "@material-ui/icons/Check";

import styles from './css/friendassets.module.css'

import {Avatar ,Card, CardContent, IconButton, Grid, Paper, InputBase } from "@material-ui/core";

//All global variables are stored in components/css/main.css

/**
 * View component for TabPanelSearch
 * @prop {function} handleAccept
 * @prop {Object} searchResult 
 */
const SearchFriendCard = ({ handleAccept, searchResult }) => {
  
  const {displayName, email, photo} = searchResult;
  return (
    <Card className={styles['friend-card']}>
      <Avatar className={styles['friend-card-photo']} alt={displayName} src={photo} />
      <CardContent className={styles['friend-card-detail']}>
        <div>{displayName}</div>
        <div>{email}</div>
      </CardContent>
      <IconButton className={styles['friend-card-check']} onClick={() => handleAccept(searchResult)}>
        <CheckIcon />
      </IconButton>
    </Card>
  );
};

export {SearchFriendCard};

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

export {FriendsSearchBar}