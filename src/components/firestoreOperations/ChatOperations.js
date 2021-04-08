import firestore from "../../redux/Firebase";
import firebase from "firebase";

const ChatListener = (currentChannel, setMessages) => {
  try {
    return firestore
      .collection("servers")
      .doc(currentChannel.serverId)
      .collection("channels")
      .doc(currentChannel.channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ ...doc.data(), messageId: doc.id }))
        );
      });
  } catch (e) {
    console.log(e);
  }
};

export { ChatListener };

const ChatSendMessage = async (currentChannel, input, user) => {
  try {
    await firestore
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
  } catch (e) {
    console.log(e);
  }
};

export { ChatSendMessage };
