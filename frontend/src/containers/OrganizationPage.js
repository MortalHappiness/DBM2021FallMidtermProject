import { useParams, useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { GET_ORG_QUERY } from "../graphql";
import Loading from "../components/Loading";

export default function OrganizationPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ORG_QUERY, {
    variables: { organizationId: parseInt(id) },
  });
  const navigate = useNavigate();

  if (loading) return <Loading />;

  return (
    <div>
      <Container>
        <Box
          sx={{
            marginTop: 4,
          }}
        >
          <Typography component="h1" variant="h4">
            {data.organization.name}
          </Typography>
          <Divider />
          <Typography component="h1" variant="h5">
            Projects
          </Typography>
          <Divider />
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
        </Box>
      </Container>
    </div>
  );
}
