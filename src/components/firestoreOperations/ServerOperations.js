import firebase from "firebase";
import firestore from "../../redux/Firebase";

//used to create new servers
const UserCreateServer = async (serverName, user) => {
  const docref = await CreateNewServer(serverName, user);
  await UpdateUserWithServer(docref.id, user);
};

const CreateNewServer = async (serverName, user) => {
  try {
    return await firestore.collection("servers").add({
      name: serverName,
      members: [user.docId],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.log(e);
  }
};

const UpdateUserWithServer = async (serverId, user) => {
  try {
    return await firestore
      .collection("users")
      .doc(user.docId)
      .update({
        servers: [...user.servers, serverId],
      });
  } catch (e) {
    console.log(e);
  }
};

export { UserCreateServer };
