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
