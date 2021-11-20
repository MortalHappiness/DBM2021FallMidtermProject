import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { GET_ME_QUERY } from "../graphql";
import Loading from "../components/Loading";
import { Grid } from "@mui/material";
import CreateOrganizationForm from "./CreateOrganizationForm.js";

export default function Dashboard() {
  const { loading, error, data } = useQuery(GET_ME_QUERY);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;
  const { organizations } = data.me;

  return (
    <div>
      <Container>
        <Box
          sx={{
            marginTop: 4,
          }}
        >
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography component="h1" variant="h4">
                Your Organizations
              </Typography>
            </Grid>
            <Grid>
              <CreateOrganizationForm />
            </Grid>
          </Grid>

          <Divider />
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
            component="nav"
          >
            {organizations.map((organization) => (
              <ListItemButton
                key={organization.id}
                onClick={() => navigate(`/organization/${organization.id}`)}
              >
                <ListItemText primary={organization.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
}
