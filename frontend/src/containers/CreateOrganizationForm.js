import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import { CREATE_ORG_MUTATION, GET_ME_QUERY } from "../graphql";

export default function CreateOrganizationForm() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [createOrg] = useMutation(CREATE_ORG_MUTATION, {
    refetchQueries: [GET_ME_QUERY],
  });

  const add = () => {
    createOrg({
      variables: {
        data: {
          name,
        },
      },
    });
    setShow(false);
    setName("");
  };

  return (
    <Box>
      <Tooltip title="Create Organization">
        <IconButton onClick={() => setShow(true)}>
          <AddCircleOutlineIcon fontSize="large" color="action" />
        </IconButton>
      </Tooltip>

      <Dialog open={show} onClose={() => setShow(false)}>
        <Box p={1}>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              name="name"
              label="Organization Name"
              fullWidth
              variant="standard"
              sx={{ my: 1, minWidth: "20rem" }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShow(false)}>Cancel</Button>
            <Button onClick={add} variant="contained" color="success">
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
