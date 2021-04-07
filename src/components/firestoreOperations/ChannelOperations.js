import { setChannels } from "../../redux/ChannelSlice";
import firestore from "../../redux/Firebase";

//Listening to changes in the current server
const CurrentServerListener = (currentServer, dispatch) => {
  return firestore
    .collection("servers")
    .doc(currentServer.serverId)
    .collection("channels")
    .orderBy("timestamp", "asc")
    .onSnapshot((snapshot) => {
      dispatch(
        setChannels(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            channelId: doc.id,
            serverId: currentServer.serverId,
          }))
        )
      );
    });
};

export { CurrentServerListener };
