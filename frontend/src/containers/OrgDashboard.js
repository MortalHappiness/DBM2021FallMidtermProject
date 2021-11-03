
import { useState } from "react";
import MuiCard from "@mui/material/Card";
import { Alert, Button, CardActions, CardContent, Input, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

function OrgDashboard({ user, org, setCurrentProj, exit }) {
  const [inputUsername, setInputUsername] = useState("");
  const [showNotifyRemoveSelf, setShowNotifyRemoveSelf] = useState(false);
  const [projList, setProjList] = useState([
    { name: "fake proj1", id: 1 },
    { name: "fake proj2", id: 2 },
    { name: "fake proj3", id: 3 },
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

  return (
    <div>
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
      {
        projList.map(proj => {
          return (
            <MuiCard variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  { proj.name }
                </Typography>
                <Typography variant="body2">{`Id: ${proj.id}`}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => setCurrentProj(proj)}>
                  Enter
                </Button>
              </CardActions>
            </MuiCard>
          )
        })
      }
    </div>
  )
}

export default OrgDashboard;