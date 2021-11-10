
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
        <div> <h1> {org.name} </h1> </div>
        <div>
          <Box>
            <Box mx={3}>
              <Input 
                placeholder="username" 
                defaultValue={inputUsername} 
                onChange={e => setInputUsername(e.target.value)}
              />
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: 'inline' }} mx={2}>
              <Button size="small" onClick={addUserToOrg}>
                Add User to organization
              </Button>
            </Box>
            <Box sx={{ display: 'inline' }} m={2}>
              <Button size="small" onClick={removeUserFromOrg}>
                Remove User from organization
              </Button>
            </Box>
          </Box>
          <Box>
            <Box m={2}>
              <Button size="small" onClick={exitOrg}>
                Exit organization
              </Button>
            </Box>
          </Box>
        </div>
      </Box>
    );
  };

  const orgProjectList = () => {
    return projList.map(proj => {
      return (
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
          <CardActions>
            <Button size="small" onClick={() => setCurrentProj(proj)}>
              Enter
            </Button>
          </CardActions>
        </MuiCard>
      )
    })
  };

  const orgUserList = () => {
    return (
      <Box>
        <Box>
          <h3>User list</h3>
        </Box>
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
    );
  };

  return (
    <div>
      {orgHeader()}
      <Grid container spacing={2}>
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