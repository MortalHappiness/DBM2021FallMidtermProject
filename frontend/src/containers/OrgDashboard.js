
import { useState } from "react";
import MuiCard from "@mui/material/Card";
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

function OrgDashboard({ username, userId, org, setCurrentProj, exit }) {
  const [inputUsername, setInputUsername] = useState("");
  const [projList, setProjList] = useState([
    { name: "fake proj1", id: 1 },
    { name: "fake proj2", id: 2 },
    { name: "fake proj3", id: 3 },
  ]);
  const [userList, setUserList] = useState([
    { username: "username" },
    { username: "username2" },
  ]);

  const exitOrg = () => {
    // TODO
    exit();
  };

  const addUserToOrg = () => {
    if (inputUsername === "") return;
    // TODO
    setInputUsername("");
  };

  const removeUserFromOrg = () => {
    if (inputUsername === "") return;
    if (inputUsername === username) {
      return exitOrg();
    }
    // TODO
    setInputUsername("");
  };

  // TODO: edit org name

  // TODO: fetch proj list for user
  // TODO: create proj

  const [showCountdown, setShowCountdown] = useState(false);
  const [deleteCountdown, setDeleteCountdown] = useState(10);
  const [hideShowCountdownTimeoutId, setHideShowCountdownTimeoutId] = useState(undefined);

  const triggerDelete = () => {
    setShowCountdown(true);
    if (hideShowCountdownTimeoutId) {
      clearTimeout(hideShowCountdownTimeoutId);
    }
    setHideShowCountdownTimeoutId(setTimeout(() => {
      setShowCountdown(false);
    }, 5000));

    if (deleteCountdown === 1) {
      console.log('yay exited');
      return exitOrg();
    }

    setDeleteCountdown(value => value - 1);
    setTimeout(() => setDeleteCountdown(value => value + 1), 1000);
  };

  const [showModifyUserForm, setShowModifyUserForm] = useState(false);

  const openModifyUserForm = () => {
    setShowModifyUserForm(true);
  };

  const closeModifyUserForm = () => {
    setShowModifyUserForm(false);
  };

  const orgHeader = () => {
    return (
      <Box m={2}>
        <Box m={2}>
          <Grid
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            container
            spacing={24}
          >
            <Grid item>
              <div>
                <h1> Project: {org.name} </h1>
              </div>
            </Grid>
            <Grid item>
              <Grid
                container
                sx={{ justifyContent: "space-between", flexDirection: "column", alignItems: "flex-end" }}>
                <Grid item>
                  <Box mx={2} sx={{ display: "inline", color: "red" }} >
                    {showCountdown ? deleteCountdown : ""}
                  </Box>
                  <Button variant="contained" color="error" sx={{ display: "inline" }} onClick={triggerDelete}>
                    Exit this organization
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={openModifyUserForm} sx={{ display: "block" }}>
                    Modify users
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={exit} sx={{ display: "block" }}>
                    Back to organization selection
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Dialog
          open={showModifyUserForm}
          onClose={closeModifyUserForm}>
          <DialogTitle>
            Modify user
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              name="username"
              label="Username"
              fullWidth
              variant="standard"
              sx={{ my: 1 }}
              onChange={e => setInputUsername(e.target.value)}
              value={inputUsername}
            />
          </DialogContent>
          <DialogActions>
            <Box
              mx={"auto"} my={0}
              sx={{ color: '#999999', fontSize: 13, display: 'inline' }}>
              <span> The content will keep if temparary close the pop-up. </span>
            </Box>
            <Button
              onClick={closeModifyUserForm}>
              Cancel
            </Button>
            <Button
              onClick={removeUserFromOrg}
              variant="contained"
              color="error">
              Remove
            </Button>
            <Button
              onClick={addUserToOrg}
              variant="contained"
              color="success">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  const orgProjectList = () => {
    return (
      <Box>
        <Box py={2}>
          <Box>
            <h2> Project List </h2>
          </Box>
          <hr />
        </Box>
        <Box px={1}>
          {
            projList.map(proj => {
              return (
                <Box my={1} onClick={() => setCurrentProj(proj)} sx={{ cursor: "pointer" }}>
                  <MuiCard variant="outlined" sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {proj.name}
                      </Typography>
                      <Typography variant="body2">
                        {`Id: ${proj.id}`}
                      </Typography>
                      <Typography variant="body2">
                        Task count: {31}
                      </Typography>
                    </CardContent>
                    {/* <CardActions>
                    </CardActions> */}
                  </MuiCard>
                </Box>
              )
            })
          }
        </Box>
      </Box>
    )
  };

  const orgUserList = () => {
    return (
      <Box>
        <MuiCard variant="outlined">
          <Box mx={2}>
            <Box>
              <h3>User list</h3>
            </Box>
            <hr />
            <Box m={2}>
              {
                userList.map(user => {
                  return (
                    <Box my={1}>
                      {user.username}
                    </Box>
                  );
                })
              }
            </Box>
          </Box>
        </MuiCard>
      </Box>
    );
  };

  return (
    <div>
      {orgHeader()}
      <hr />
      <Grid container spacing={2} my={2}>
        <Grid item xs={9}>
          {orgProjectList()}
        </Grid>
        <Grid item xs={3}>
          {orgUserList()}
        </Grid>
      </Grid>
    </div>
  )
}

export default OrgDashboard;