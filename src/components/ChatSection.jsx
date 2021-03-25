import React, { useEffect, useRef, useState } from "react";

import { Grid, Box, Paper, InputBase, Avatar } from "@material-ui/core";
import "./css/chat.css";

import firebase from "firebase";
import firestore from "../redux/Firebase";
import { selectCurrentChannel } from "../redux/ChannelSlice";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";

const ChannelHeader = () => {
  const currentChannel = useSelector(selectCurrentChannel);

  return (
    <Grid item style={{ height: "8.33%" }}>
      {!currentChannel ? (
        <Box className="chat-section-box-wrapper chat-header">
          No Channel Selected
        </Box>
      ) : (
        <Box className="chat-section-box-wrapper chat-header">
          # {currentChannel.name}
        </Box>
      )}
    </Grid>
  );
};

const ChatInput = () => {
  const user = useSelector(selectUser);
  const currentChannel = useSelector(selectCurrentChannel);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      //enter
      firestore
        .collection("servers")
        .doc(currentChannel.serverId)
        .collection("channels")
        .doc(currentChannel.channelId)
        .collection("messages")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          author: user,
        });

      setInput("");
    }
  };

  return (
    <Grid
      item
      container
      alignItems="center"
      justify="center"
      style={{ height: "8.33%" }}
    >
      {/* <Box className="chat-section-box-wrapper">ChatInput</Box> */}
      <Paper className="chat-bar">
        <InputBase
          className="chat-input-bar"
          fullWidth
          value={input}
          disabled={!currentChannel}
          placeholder="Chat Here..."
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => handleSubmit(e)}
        />
      </Paper>
    </Grid>
  );
};

const ChatLogs = () => {
  const currentChannel = useSelector(selectCurrentChannel);
  const dummy = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};
    if (currentChannel)
      unsubscribe = firestore
        .collection("servers")
        .doc(currentChannel.serverId)
        .collection("channels")
        .doc(currentChannel.channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .limit(50)
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => ({...doc.data(), messageId: doc.id })));
        });
    return () => {
      unsubscribe();
    };
  }, [currentChannel]);

  useEffect(() => {
    dummy.current.scrollIntoView();
  }, [messages]);

  return (
    <Grid className="chat-log" item style={{ height: "83.33%" }}>
      {messages.length > 0 ? (
        messages.map((message) => <Message key={message.messageId}  message={message} />)
      ) : (
        <Box>No Message</Box>
      )}
      <div ref={dummy}></div>
    </Grid>
  );
};

const Message = ({ message: { message, author, timestamp } }) => {
  const { displayName, photo } = author;
  
  //Sometimes firestore does not react quick enough
  const date = timestamp ? new Date(timestamp.toDate()).toDateString() : '';
  return (
    <Box className="message-box">
      <Avatar className='chat-avatar' src={photo} alt={displayName} />
      <Box>{displayName}&nbsp;&nbsp;&nbsp;&nbsp;{date}<br/>{message}</Box>
    </Box>
  );
};

const ChatSection = () => {
  return (
    <Grid
      container
      item
      direction="column"
      xs={12}
      spacing={1}
      style={{ maxHeight: "100%", paddingLeft: 10 }}
    >
      <ChannelHeader />
      <ChatLogs />
      <ChatInput />
    </Grid>
  );
};

export default ChatSection;
