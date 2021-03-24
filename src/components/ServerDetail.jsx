import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Grid,
} from "@material-ui/core";
import "./css/servers.css";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";
import { selectCurrentServer } from "../redux/ServerSlice";

import firestore, { auth } from "../redux/Firebase";

//Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const ServerHeader = ({ currentServer }) => {
  return (
    <Grid item style={{ height: "16.66%" }}>
      <Box className="server-detail-box-wrapper ">
        {currentServer ? <div>{currentServer.name}</div> : <div>No Server</div>}
      </Box>
    </Grid>
  );
};

const ServerChannels = ({ currentServer }) => {
  const [expandAccordion, toggleExpandAccordion] = useState(true);

  const handleAddChannel = () => {
    const name = prompt("Enter a channel name");
    if (name === null) return;
    if (!name.trim()) return;
    //create new server in firestore
    firestore
      .collection("channels")
      .add({ name: name })
      .then((res) => {
        firestore
          .collection("servers")
          .doc(currentServer.serverId)
          .update({
            channels: [...currentServer.channels, res.id],
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid item style={{ height: "75%" }}>
      <Box className="server-detail-box-wrapper server-detail-channel">
        {currentServer ? (
          <Accordion
            expanded={expandAccordion}
            onChange={() => {
              toggleExpandAccordion(!expandAccordion);
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Channels
            </AccordionSummary>
            <AccordionDetails>
              {currentServer.channels.map((channel) => (
                <div key={channel}>{channel}</div>
              ))}
              <AddCircleOutlineIcon
                className="my-icons"
                onClick={handleAddChannel}
              />
            </AccordionDetails>
          </Accordion>
        ) : (
          <div>No Server</div>
        )}
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

  const [serverData, setServerData] = useState(null);

  useEffect(() => {
    if (currentServer)
      firestore
        .collection("servers")
        .doc(currentServer.serverId)
        .onSnapshot((snapshot) => {
          setServerData({ ...snapshot.data(), serverId: snapshot.id });
        });
  }, [currentServer]);

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
        <ServerHeader currentServer={serverData} />
        <ServerChannels currentServer={serverData} />
        <UserInterface user={user} auth={auth} />
      </Grid>
    </>
  );
};

export default ServerDetail;
