import React, { useEffect } from "react";

import { Grid } from "@material-ui/core";
import "./css/main.css";

import { useDispatch, useSelector } from "react-redux";
import { additionalData, selectUser } from "../redux/UserSlice";
import { addServer, resetServerList} from "../redux/ServerSlice";

import firestore from "../redux/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Servers from "./Servers";
import ServerDetail from "./ServerDetail";
import FriendsSection from "./FriendsSection";
import ChatSection from "./ChatSection";

const Main = () => {
  const user = useSelector(selectUser);
  const query = firestore
    .collection("users")
    .where("uid", "==", user.uid)
    .limit(1);
  const [checkUser] = useCollectionData(query, { idField: "docId" });

  const dispatch = useDispatch();
  //Check if user is new
  useEffect(() => {
    if (typeof checkUser === "undefined") return;
    if (checkUser.length === 0) {
      // User is not currently in firestore
      firestore.collection("users").add({ ...user, servers: [], friends: [] });
    }
  }, [checkUser, user]);

  useEffect(() => {
    //Grabs all new information from firebase
    if (typeof checkUser === "undefined") return;
    if (checkUser.length === 0) return;
    dispatch(additionalData(checkUser[0]));
    dispatch(resetServerList());
    checkUser[0].servers.forEach((server) => {
      firestore
        .collection("servers")
        .doc(server)
        .get()
        .then((res) => {
          dispatch(addServer({ ...res.data(), serverId: res.id }));
        });
    });
  }, [dispatch, checkUser]);

  return (
    <>
      <Grid className="App" container item xs={12}>
        <Grid className="servers-wrapper" container item xs={1}>
          <Servers />
        </Grid>
        <Grid className="server-detail-wrapper" container item xs={2}>
          <ServerDetail />
        </Grid>
        <Grid className="chat-wrapper" container item xs={6}>
          <ChatSection />
        </Grid>
        <Grid className="friends-list-wrapper" container item xs={3}>
          <FriendsSection />
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
