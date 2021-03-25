import React, { useEffect } from "react";

import { Avatar, Box, Grid } from "@material-ui/core";
import "./css/servers.css";

import ChannelSection from "./ChannelSection";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";
import { selectCurrentServer } from "../redux/ServerSlice";
import { setChannels } from "../redux/ChannelSlice";

import firestore, { auth } from "../redux/Firebase";

//Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";

const ServerHeader = ({ currentServer }) => {

  useEffect(() => {

  },[currentServer])

  return (
    <Grid item style={{ height: "16.66%" }}>
      <Box className="server-detail-box-wrapper ">
        {currentServer ? <div>{currentServer.name}</div> : <div>No Server</div>}
      </Box>
    </Grid>
  );
};

const ServerChannels = ({ currentServer }) => {
  return (
    <Grid item style={{ height: "75%" }}>
      <Box className="server-detail-box-wrapper server-detail-channel">
        {currentServer ? <ChannelSection /> : <div>No Server</div>}
      </Box>
    </Grid>
  );
};

const UserInterface = ({ user, auth }) => {
  return (
    <Grid item style={{ height: "8.33%" }}>
      <Box className="server-detail-box-wrapper user-info-panel">
        <Avatar alt={user.displayName} src={user.photo} />
        <div>
          <SettingsIcon className="my-icons" />
          <ExitToAppIcon className="my-icons" onClick={() => auth.signOut()} />
        </div>
      </Box>
    </Grid>
  );
};

const ServerDetail = () => {
  const user = useSelector(selectUser);
  const currentServer = useSelector(selectCurrentServer);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = () => {};
    if (currentServer)
      unsubscribe = firestore
        .collection("servers")
        .doc(currentServer.serverId)
        .collection("channels")
        .onSnapshot((snapshot) => {
          dispatch(
            setChannels(
              snapshot.docs.map((doc) => ({ ...doc.data(), channelId: doc.id, serverId: currentServer.serverId }))
            )
          );
          // setServerData({ ...snapshot.data(), serverId: snapshot.id });
        });

    return () => {
      unsubscribe();
    };
  }, [dispatch, currentServer]);

  return (
    <>
      <Grid
        className="server-detail-container"
        container
        item
        direction="column"
        xs={12}
        spacing={1}
        style={{ maxHeight: "100%" }}
      >
        <ServerHeader currentServer={currentServer} />
        <ServerChannels currentServer={currentServer} />
        <UserInterface user={user} auth={auth} />
      </Grid>
    </>
  );
};

export default ServerDetail;
