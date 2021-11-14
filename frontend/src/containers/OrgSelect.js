
import { useEffect, useState } from "react";
import MuiCard from "@mui/material/Card";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import { GET_ORGS_BY_USER } from "../graphql/queries.js";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/system";

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

  useEffect(() => {
    console.log({ loading, error, data });
  }, [loading, error, data])

  // TODO: fetch org list for user
  // TODO: be able to exit a organization

  return (
    <Box>
      <Box> <h1> Hello! {username} </h1> </Box>
      <Box> <h2> Your Organizations </h2> </Box>
      <Box>
        {
          orgList.map(org => {
            return (
              <Box my={2} onClick={() => setCurrentOrg(org)} sx={{ cursor: "pointer" }}>
                <MuiCard variant="outlined" sx={{ minWidth: 275 }} >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {org.name}
                    </Typography>
                    {/* <Typography variant="body1">
                      {`Id: ${org.id}`}
                    </Typography> */}
                    <Typography variant="body2">
                      {`Project count: 12334(fake)`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => { }}>
                      Exit Organization (Fake) (TODO)
                    </Button>
                  </CardActions>
                </MuiCard>
              </Box>
            )
          })
        }
      </Box >
    </Box >
  )
}

export default OrgSelect;