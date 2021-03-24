import React from "react";

import {Avatar, Box, Grid } from "@material-ui/core";
import "./css/servers.css";

import {selectUser} from '../redux/UserSlice';
import { useSelector } from "react-redux";

import {auth} from '../redux/Firebase';

//Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';


const ServerName = () => {
  return (
    <Grid item style={{ height: "16.66%" }}>
      <Box className="server-detail-box-wrapper ">
        ServerName
      </Box>
    </Grid>
  );
};

const ServerChannels = () => {
  return (
    <Grid item style={{ height: "75%" }}>
      <Box className="server-detail-box-wrapper server-detail-channel">
        Channels
      </Box>
    </Grid>
  );
};

const UserInterface = ({user, auth}) => {
  return(
    <Grid item style={{ height: "8.33%" }}>
      <Box className="server-detail-box-wrapper user-info-panel">
        
        <Avatar alt={user.displayName} src={user.photo}/>
        <div>
        <SettingsIcon className='my-icons'/>
        <ExitToAppIcon className='my-icons' onClick={()=> auth.signOut()} />
        </div>
      </Box>
    </Grid>
  )
}

const ServerDetail = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <Grid
        className="server-detail-container"
        container item
        direction="column"
        xs={12}
        spacing={1}
        style={{ maxHeight: "100%" }}
      >
        <ServerName />
        <ServerChannels />
        <UserInterface user={user} auth={auth} />
      </Grid>
    </>
  );
};

export default ServerDetail;
