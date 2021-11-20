import { useParams, useNavigate } from "react-router";
import { useMutation, useQuery } from "@apollo/client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { GET_ORG_QUERY } from "../graphql";
import Loading from "../components/Loading";
import { Button, Grid } from "@mui/material";
import { JOIN_ORG_MUTATION } from "../graphql";

export default function OrganizationInvitationPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ORG_QUERY, {
    variables: { organizationId: parseInt(id) },
  });
  const navigate = useNavigate();
  const [joinOrg] = useMutation(JOIN_ORG_MUTATION);

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  const join = () => {
    joinOrg({
      variables: {
        organizationId: Number(id),
      },
    });
    navigate(`/organization/${id}`);
  };

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
          <Box my={2} sx={{ margin: "" }}>
            Do you want to join this organization?
            <Box my={2}>
              <Grid container justifyContent="space-around">
                <Grid item>
                  <Button variant="contained" color="success" sx={{ padding: "5px 5rem" }} onClick={join}>
                    Yes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
