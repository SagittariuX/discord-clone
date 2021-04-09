import firestore from "../../redux/Firebase";

/**
 * Searches FireBase for friend based on email reference
 * @param {string} input
 * @param {function} setResult
 */

const SearchForFriend = async (input, setResult) => {
  try {
    await firestore
      .collection("users")
      .where("email", "==", input)
      .limit(1)
      .get()
      .then((res) => {
        if (res.empty) {
          setResult({});
          return;
        }
        res.forEach((doc) => {
          setResult({ ...doc.data(), docId: doc.id });
        });
      });
  } catch (e) {
    console.log(e);
  }
};

export { SearchForFriend };

/**
 *
 * @param {Object} user
 * @param {Object} friend
 */
const AddFriend = async (user, friend) => {
  const {
    docId: userDocId,
    displayName: userDisplayName,
    email: userEmail,
    photo: userPhoto,
    friends: userFriendsList,
  } = user;

  const {
    docId: friendDocId,
    displayName: friendDisplayName,
    email: friendEmail,
    photo: friendPhoto,
    friends: friendFriendsList,
  } = friend;

  const copyUserFriendsList = [...userFriendsList];
  const copyFriendFriendsList = [...friendFriendsList];

  copyUserFriendsList.push({
    docId: friendDocId,
    email: friendEmail,
    displayName: friendDisplayName,
    photo: friendPhoto,
  });

  copyFriendFriendsList.push({
    docId: userDocId,
    email: userEmail,
    displayName: userDisplayName,
    photo: userPhoto,
  });

  //First add friend to user
  try {
    await firestore
      .collection("users")
      .doc(userDocId)
      .update({ friends: copyUserFriendsList });
  } catch (e) {
    console.log(e);
    return false;
  }

  //Then add user to friend
  try {
    await firestore
      .collection("users")
      .doc(friendDocId)
      .update({ friends: copyFriendFriendsList });
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

export { AddFriend };
