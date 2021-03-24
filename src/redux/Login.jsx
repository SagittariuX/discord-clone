import React from "react";

import './login.css'

//Firebase
import { auth, googleProvider } from "./Firebase";

import { Button } from "@material-ui/core";

const Login = () => {

  const signIn = () => {
    auth.signInWithPopup(googleProvider).catch(err => alert(err.message));
  };

  return (
    <div className="login">
      <Button color="primary" variant='contained' onClick={signIn}>
        Sign In With Google
      </Button>
    </div>
  );
};

export default Login;
