import React, { useEffect } from "react";

//My components
import Main from "./components/Main";
import Login from "./redux/Login";

import { auth } from "./redux/Firebase";

import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/UserSlice";
import { resetServersInfo } from "./redux/ServerSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        dispatch(
          login({
            uid: auth.uid,
            photo: auth.photoURL,
            email: auth.email,
            displayName: auth.displayName,
          })
        );
      } else {
        dispatch(logout());
        dispatch(resetServersInfo());
      }
    });
  }, [dispatch]);

  return <>{user ? <Main /> : <Login />}</>;
}

export default App;
