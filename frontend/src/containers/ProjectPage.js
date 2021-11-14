import { useParams, useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { GET_PROJECT_QUERY } from "../graphql";
import Loading from "../components/Loading";

export default function OrganizationPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId: parseInt(id) },
  });

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  return (
    <div>
      <Container>
        <Box
          sx={{
            marginTop: 4,
          }}
        >
          <Typography component="h1" variant="h4">
            {data.project.name}
          </Typography>
          <Divider />
        </Box>
      </Container>
    </div>
  );
}
