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
import { Grid, IconButton, ListItem, ListItemIcon, Tooltip } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import CreateOrganizationInvitation from "./CreateOrganizationInvitation.js";
import ExitToAppIcon from '@mui/icons-material/ExitToAppOutlined';
import CreateProjectForm from "./CreateProjectForm.js";

export default function OrganizationPage() {
  const { id } = useParams();
  const organizationId = parseInt(id) || null;
  const { loading, error, data } = useQuery(GET_ORG_QUERY, {
    variables: { organizationId },
  });
  const [leaveOrg] = useMutation(LEAVE_ORG_MUTATION, {
    refetchQueries: [GET_ME_QUERY],
  });
  const navigate = useNavigate();

  const leaveOrganization = () => {
    leaveOrg({
      variables: {
        organizationId,
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
          <Grid container direction="row">
            <Grid item xs>
              <Typography component="h1" variant="h4">
                {data.organization.name}
              </Typography>
            </Grid>
            <Grid item xs="auto" mx={1}>
              <Tooltip title="Leave Organization">
                <IconButton
                  color="error"
                  onClick={leaveOrganization}>
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Box my={2}>
            <Divider />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container direction="row">
                <Grid item xs>
                  <Typography component="h1" variant="h5">
                    Projects
                  </Typography>
                </Grid>
                <Grid item xs="auto" mx={1}>
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
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={project.name} secondary={`${project.tasks?.length} task(s)`} />
                  </ListItemButton>
                ))}
              </List>
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="row">
                <Grid item xs>
                  <Typography component="h1" variant="h5">
                    Members
                  </Typography>
                </Grid>
                <Grid item xs="auto" mx={1}>
                  <CreateOrganizationInvitation organizationId={organizationId} />
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
                  <ListItem key={user.id}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={user.displayName} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
