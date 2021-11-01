
import { useState } from "react";
import MuiCard from "@mui/material/Card";
import { Button, CardActions, CardContent, Typography } from "@mui/material";

function OrgDashboard({ user, org, setCurrentProj }) {
  const [projList, setProjList] = useState([
    { name: "fake proj1", id: 1 },
    { name: "fake proj2", id: 2 },
    { name: "fake proj3", id: 3 },
  ]);

  // TODO: add user to org
  // TODO: do we have permission control in org? eg, normal user, manager, admin
  // TODO: edit org name
  // TODO: exit org

  // TODO: fetch proj list for user
  // TODO: create proj

  return (
    <div>
      <div> <h1> {org.name} </h1> </div>
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