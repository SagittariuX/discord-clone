import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Button,
} from "@material-ui/core";

import firebase from "firebase";
import firestore from "../redux/Firebase";

import "./css/servers.css";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { selectCurrentServer } from "../redux/ServerSlice";
import {
  selectChannels,
  selectCurrentChannel,
  setCurrentChannel,
} from "../redux/ChannelSlice";
import { useDispatch, useSelector } from "react-redux";

const ChannelSelect = ({ channel }) => {
  const currentChannel = useSelector(selectCurrentChannel);
  const dispatch = useDispatch();
  let focus = '';
  if (currentChannel && channel.channelId === currentChannel.channelId )
    focus = "focus-channel" ;

  return (
    <Grid item xs={12}>
      <Button
        className={`channel-btns ${focus}`}
        onClick={() => dispatch(setCurrentChannel(channel))}
      >
        {channel.name}
      </Button>
    </Grid>
  );
};

const ChannelSection = () => {
  const currentServer = useSelector(selectCurrentServer);
  const channels = useSelector(selectChannels);
  const [expandAccordion, toggleExpandAccordion] = useState(true);

  const handleAddChannel = () => {
    const name = prompt("Enter a channel name (Max Length 15)");
    if (name === null) return;
    if (!name.trim()) return;
    if (name.length > 15) {
      alert("Max length 15");
      return;
    }
    //create new channel in firestore
    firestore
      .collection("servers")
      .doc(currentServer.serverId)
      .collection("channels")
      .add({
        name: name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <Grid item xs={12}>
      <Accordion
        className="channel-accordion"
        expanded={expandAccordion}
        onChange={() => {
          toggleExpandAccordion(!expandAccordion);
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon className="my-icons" />}>
          Channels
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <AddCircleOutlineIcon
              className="my-icons"
              onClick={handleAddChannel}
            />
            {channels.length > 0 &&
              channels.map((channel) => (
                <ChannelSelect key={channel.channelId} channel={channel} />
              ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default ChannelSection;
