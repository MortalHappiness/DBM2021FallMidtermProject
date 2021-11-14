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

export default function Dashboard() {
  const { loading, error, data } = useQuery(GET_ME_QUERY);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  const { organizations } = data.me;

  return (
    <div>
      <Container>
        <Box
          sx={{
            marginTop: 4,
          }}
        >
          <Typography component="h1" variant="h4">
            Your Organizations
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
