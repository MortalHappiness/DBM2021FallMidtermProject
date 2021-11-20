import { useParams, useNavigate } from "react-router";
import { useMutation, useQuery } from "@apollo/client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { GET_ME_QUERY, GET_ORG_QUERY, LEAVE_ORG_MUTATION } from "../graphql";
import Loading from "../components/Loading";
import { Button, Grid } from "@mui/material";
import CreateOrganizationInvitation from "./CreateOrganizationInvitation.js";
import CreateProjectForm from "./CreateProjectForm.js";

export default function OrganizationPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ORG_QUERY, {
    variables: { organizationId: parseInt(id) },
  });
  const [leaveOrg] = useMutation(LEAVE_ORG_MUTATION, {
    refetchQueries: [GET_ME_QUERY],
  });
  const navigate = useNavigate();

  const leaveOrganization = () => {
    leaveOrg({
      variables: {
        organizationId: Number(id),
      },
    });
    navigate('/dashboard');
  }

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  return (
    <div>
      <Container>
        <Box mt={4}>
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
            <Grid item>
              <Typography component="h1" variant="h4">
                {data.organization.name}
              </Typography>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="error"
                onClick={leaveOrganization}>
                Leave Organization
              </Button>
            </Grid>
          </Grid>

          <Box my={2}>
            <Divider />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Projects
                  </Typography>
                </Grid>
                <Grid>
                  <CreateProjectForm orgId={Number(id)} />
                </Grid>
              </Grid>
              <Box my={1}>
                <Divider />
              </Box>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
              >
                {data.organization.projects.map((project) => (
                  <ListItemButton
                    key={project.id}
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <ListItemText primary={project.name} />
                  </ListItemButton>
                ))}
              </List>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Members
                  </Typography>
                </Grid>
                <Grid>
                  <CreateOrganizationInvitation />
                </Grid>
              </Grid>

              <Box my={1}>
                <Divider />
              </Box>

              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
              >
                {data.organization.users.map((user) => (
                  <ListItemText key={user.id} primary={user.displayName} />
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
