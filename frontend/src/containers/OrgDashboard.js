
import { useState } from "react";
import MuiCard from "@mui/material/Card";
import { Button, CardActions, CardContent, Grid, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";

function OrgDashboard({ user, org, setCurrentProj, exit }) {
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
    if (inputUsername === user.username) {
      return exitOrg();
    }
    // TODO
    setInputUsername("");
  };

  // TODO: edit org name

  // TODO: fetch proj list for user
  // TODO: create proj

  const orgHeader = () => {
    return (
      <Box m={2}>
        <Box> <h1> {org.name} </h1> </Box>

        <MuiCard variant="outlined">
          <Box p={2}>
            <Box>
              <Box mx={2}>
                <Input
                  placeholder="username"
                  defaultValue={inputUsername}
                  onChange={e => setInputUsername(e.target.value)}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'inline' }} mx={1}>
                  <Button size="small" onClick={addUserToOrg}>
                    Add User to organization
                  </Button>
                </Box>
                <Box sx={{ display: 'inline' }} m={1}>
                  <Button size="small" onClick={removeUserFromOrg}>
                    Remove User from organization
                  </Button>
                </Box>
              </Box>
            </Box>
            <hr />

            <Box>
              <Box mx={1}>
                <Button size="small" onClick={exitOrg}>
                  Exit organization
                </Button>
              </Box>
            </Box>
          </Box>
        </MuiCard>
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