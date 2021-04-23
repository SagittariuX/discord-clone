import React from "react";

import CheckIcon from "@material-ui/icons/Check";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import styles from "./css/friendassets.module.css";

import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Grid,
  Paper,
  InputBase,
  Popover,
  Button,
} from "@material-ui/core";

//All global variables are stored in components/css/main.css

/**
 * Search bar asset used to look up friends
 * @param {string} searchInput
 * @param {function} setSearchInput
 * @param {function} handleSearchSubmit
 */
export const FriendsSearchBar = ({
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

/**
 * View component for TabPanelSearch
 * @prop {function} handleAccept
 * @prop {Object} searchResult
 */
export const SearchFriendCard = ({ handleAccept, searchResult }) => {
  const { displayName, email, photo } = searchResult;
  return (
    <Card className={styles["friend-card"]}>
      <Avatar
        className={styles["friend-card-photo"]}
        alt={displayName}
        src={photo}
      />
      <CardContent className={styles["friend-card-detail"]}>
        <div>{displayName}</div>
        <div>{email}</div>
      </CardContent>
      <IconButton
        className={styles["friend-card-check"]}
        onClick={() => handleAccept(searchResult)}
      >
        <CheckIcon />
      </IconButton>
    </Card>
  );
};

export const FriendCard = ({ friendInfo, handleOpenOptions }) => {
  const { displayName, email, photo } = friendInfo;

  return (
    <Card className={styles["friend-card"]}>
      <Avatar
        className={styles["friend-card-photo"]}
        alt={displayName}
        src={photo}
      />
      <CardContent className={styles["friend-card-detail"]}>
        <div>{displayName}</div>
        <div>{email}</div>
      </CardContent>
      <IconButton
        className={styles["friend-card-options"]}
        onClick={(e) => handleOpenOptions(e, friendInfo)}
      >
        <MoreVertIcon />
      </IconButton>
    </Card>
  );
};

/**
 * Using MUI popover component to allow user to use options
 * https://material-ui.com/components/popover/
 * @param {string|undefined} id
 * @param {boolean} open
 * @param {HTML Element} anchor
 * @param {Object} friend
 * @param {function} handleClose
 * @param {function} handleRemoveFriend
 */
export const FriendOptions = ({
  id,
  open,
  anchor,
  friend,
  handleClose,
  handleRemoveFriend,
}) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchor}
      onClose={() => handleClose()}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Button onClick={() => handleRemoveFriend(friend)}>
        Remove
      </Button>
    </Popover>
  );
};


/**
 * Using MUI popover component to allow user to use options
 * https://material-ui.com/components/popover/
 * @param {string|undefined} id
 * @param {boolean} open
 * @param {HTML Element} anchor
 * @param {Object} member
 * @param {function} handleClose
 * @param {function} handleRemoveFriend
 */
export const ServerMemberOptions = ({
  id,
  open,
  anchor,
  member,
  handleClose,
  handleRemoveMember,
}) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchor}
      onClose={() => handleClose()}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Button onClick={() => handleRemoveMember(member)}>
        Remove
      </Button>
    </Popover>
  );
};
