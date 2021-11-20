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
import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CREATE_PROJECT_MUTATION, GET_ORG_QUERY } from "../graphql";

export default function CreateProjectForm({ orgId }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [createProject] = useMutation(CREATE_PROJECT_MUTATION, {
    refetchQueries: [GET_ORG_QUERY],
  });

  const add = () => {
    createProject({
      variables: {
        data: {
          name,
          organizationId: orgId,
        },
      },
    });
    setShow(false);
    setName("");
  };

  return (
    <Box>
      <Tooltip title="Create Project">
        <IconButton onClick={() => setShow(true)}>
          <AddCircleOutlineIcon onClick={() => setShow(true)} color="action" />
        </IconButton>
      </Tooltip>
      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="name"
            label="Project Name"
            fullWidth
            variant="standard"
            sx={{ my: 1 }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Box
            mx={"auto"}
            my={0}
            sx={{ color: "#999999", fontSize: 13, display: "inline" }}
          >
            <span> The content will keep if temparary close the pop-up. </span>
          </Box>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={add} variant="contained" color="success">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
