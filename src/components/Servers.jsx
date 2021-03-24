import { Avatar, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import "./css/servers.css";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/UserSlice";
import {
  addServer,
  resetServerList,
  selectServers,
  setCurrentServer,
} from "../redux/ServerSlice";

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
        alt={server.name}
        style={{ margin: "10px 0" }}
        onClick={() => dispatch(setCurrentServer(server))}
      />
    );

  return <></>;
};

// const CreateServerForm = () => {
//   const onSubmit = async () => {
//     console.log("submit");
//   };

//   const validate = (values) => {
//     const error = {};

//     if (!values.name.trim()) error.name = "Required";

//     return error;
//   };

//   return (
//     <Form
//       onSubmit={onSubmit}
//       validate={validate}
//       render={({ handleSubmit, form }) => (
//         <form noValidate onSubmit={(e) => handleSubmit(e)}>
//           <Paper elevation={2}>
//             <Grid
//               container
//               alignContent="center"
//               direction="column"
//               spacing={2}
//             >
//               <Grid item xs={10}>
//                 <Field
//                   fullWidth
//                   required
//                   name="name"
//                   label="Server Name"
//                   component={TextField}
//                 ></Field>
//               </Grid>
//               <Grid item xs={10}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                 >
//                   Create
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </form>
//       )}
//     />
//   );
// };

const Servers = () => {
  const user = useSelector(selectUser);
  const servers = useSelector(selectServers);
  const dispatch = useDispatch();

  // const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (user.servers) {
      dispatch(resetServerList());
      user.servers.forEach((server) => {
        firestore
          .collection("servers")
          .doc(server)
          .get()
          .then((res) => {
            dispatch(addServer({...res.data(), serverId: res.id}));
          });
      });
    }
  }, [user, dispatch]);

  const handleCreateServer = () => {
    const name = prompt("Enter a server name");
    if (name === null) return;
    if (!name.trim()) return;
    //create new server in firestore
    firestore
      .collection("servers")
      .add({
        name: name,
        channels: [],
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
