import React, { useEffect, useRef, useState } from "react";

import { Grid, Box, Paper, InputBase, Avatar } from "@material-ui/core";
import "./css/chat.css";

import { selectCurrentChannel } from "../redux/ChannelSlice";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";

import {
  ChatListener,
  ChatSendMessage,
} from "./firestoreOperations/ChatOperations";

const ChannelHeader = ({ currentChannel }) => {
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

const ChatInput = ({ currentChannel, user }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    if (input.trim() === "") return;

    if (e.keyCode === 13) {
      //enter
      ChatSendMessage(currentChannel, input, user);

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

const ChatLogs = ({ currentChannel }) => {
  const dummy = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};
    if (currentChannel) unsubscribe = ChatListener(currentChannel, setMessages);
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
        messages.map((message) => (
          <Message key={message.messageId} message={message} />
        ))
      ) : (
        <Box>No Message</Box>
      )}
      <div ref={dummy}></div>
    </Grid>
  );
};

//Remember to move this to /assets/
const Message = ({ message: { message, author, timestamp } }) => {
  const { displayName, photo } = author;

  //Sometimes firestore does not react quick enough
  const date = timestamp ? new Date(timestamp.toDate()).toDateString() : "";
  return (
    <Box className="message-box">
      <Avatar className="chat-avatar" src={photo} alt={displayName} />
      <Box>
        {displayName}&nbsp;&nbsp;&nbsp;&nbsp;{date}
        <br />
        {message}
      </Box>
    </Box>
  );
};

const ChatSection = () => {
  const currentChannel = useSelector(selectCurrentChannel);
  const user = useSelector(selectUser);

  return (
    <Grid
      container
      item
      direction="column"
      xs={12}
      spacing={1}
      style={{ maxHeight: "100%", paddingLeft: 10 }}
    >
      <ChannelHeader currentChannel={currentChannel} />
      <ChatLogs currentChannel={currentChannel} />
      <ChatInput user={user} currentChannel={currentChannel} />
    </Grid>
  );
};

export default ChatSection;
