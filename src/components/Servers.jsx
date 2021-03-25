import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import "./css/servers.css";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";
import { selectServers, setCurrentServer } from "../redux/ServerSlice";

import firestore from "../redux/Firebase";

// import { Form, Field } from "react-final-form";
// import { TextField } from "final-form-material-ui";

//Icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const ServerSelect = ({ server }) => {
  const dispatch = useDispatch();

  if (server)
    return (
      <Avatar
        className='my-avatar'
        alt={server.name}
        style={{ margin: "10px 0" }}
        onClick={() => dispatch(setCurrentServer(server))}
      >{server.name.charAt(0)}</Avatar>
    );

  return <></>;
};

const Servers = () => {
  const user = useSelector(selectUser);
  const servers = useSelector(selectServers);

  // const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateServer = () => {
    const name = prompt("Enter a server name (Max length 15)");
    if (name === null) return;
    if (!name.trim()) return;
    if (name.length > 15) {
      alert('Max length 15');
      return
    }
    //create new server in firestore
    firestore
      .collection("servers")
      .add({
        name: name,
        members: [user.docId],
      })
      .then((docRef) => {
        //adds new server into current user's list of servers
        firestore
          .collection("users")
          .doc(user.docId)
          .update({
            servers: [...user.servers, docRef.id],
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid className="servers-content-container" container direction="column">
      {user &&
        servers.length > 0 &&
        servers.map((server) => (
          <ServerSelect key={server.name} server={server} />
        ))}
      <AddCircleOutlineIcon
        className="my-icons"
        fontSize="large"
        onClick={handleCreateServer}
      />

      {/* Figure out a way in the future to use modal forms */}
      {/* <Modal
        className="create-server-modal"
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      >
        <CreateServerForm />
      </Modal> */}
    </Grid>
  );
};

export default Servers;
