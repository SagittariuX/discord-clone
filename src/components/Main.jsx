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


// const myCompareList = (l1, l2) => {
//   if (l1.length !== l2.length) return false;

//   return l1.every((e) => l2.includes(e));
// }


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
    //Run this when user info changes
    if (typeof checkUser === "undefined") return;
    if (checkUser.length === 0) return;
    dispatch(additionalData(checkUser[0]));
  }, [dispatch, checkUser]);

  useEffect(() => {
    //Check if user servers have been updated if so reset servers and add in new ones
    
    if(!user) return;
    if(!user.servers) return;
    
    //compare serverList before continue
    //if comparison is true there is no need to redo servers    
    dispatch(resetServerList());
    

    user.servers.forEach((server) => {
      firestore
        .collection("servers")
        .doc(server)
        .get()
        .then((res) => {
          dispatch(addServer({ ...res.data(), serverId: res.id }));
        });
    });
  },[dispatch, user])

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
