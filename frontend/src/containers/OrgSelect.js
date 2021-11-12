
import { useEffect, useState } from "react";
import MuiCard from "@mui/material/Card";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import { GET_ORGS_BY_USER } from "../graphql/queries.js";
import { useQuery } from "@apollo/client";

function OrgSelect({ username, userId, setCurrentOrg }) {
  const [orgList, setOrgList] = useState([
    { name: "fake org1", id: 1 },
    { name: "fake org2", id: 2 },
    { name: "fake org3", id: 3 },
  ]);

  const { loading, error, data, subscribeToMore } = useQuery(GET_ORGS_BY_USER, {
    variables: {
      userId,
    },
  });

  // TODO: fetch org list for user
  // TODO: be able to exit a organization

  return (
    <div>
      <div> <h1> Hello! { username } </h1> </div>
      <div> <h1> Your Organizations </h1> </div>
      {
        orgList.map(org => {
          return (
            <MuiCard variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  { org.name }
                </Typography>
                <Typography variant="body2">{`Id: ${org.id}`}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => setCurrentOrg(org)}>
                  Enter
                </Button>
                <Button size="small" onClick={() => {}}>
                  Exit Organization (Fake) (TODO)
                </Button>
              </CardActions>
            </MuiCard>
          )
        })
      }
    </div>
  )
}

export default OrgSelect;