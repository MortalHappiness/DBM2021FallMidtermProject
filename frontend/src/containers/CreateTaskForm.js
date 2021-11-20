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
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { useState } from "react";
import { CREATE_TASK_MUTATION, GET_PROJECT_QUERY } from "../graphql";

export default function CreateTaskForm({ projectId }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createTask] = useMutation(CREATE_TASK_MUTATION, {
    refetchQueries: [GET_PROJECT_QUERY],
  });

  const add = () => {
    createTask({
      variables: {
        data: {
          title,
          content,
          projectId,
        },
      },
    });
    setShow(false);
  };

  return (
    <Box>
      <Tooltip title="Create Task">
        <IconButton onClick={() => setShow(true)}>
          <PlaylistAddOutlinedIcon color="action" />
        </IconButton>
      </Tooltip>

      <Dialog open={show} onClose={() => setShow(false)}>
        <Box p={1}>
          <DialogTitle>Create Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              name="title"
              label="Title"
              fullWidth
              variant="standard"
              sx={{ my: 1 }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextField
              name="content"
              label="Content"
              fullWidth
              multiline
              variant="standard"
              sx={{ my: 1 }}
              onChange={(e) => setContent(e.target.value)}
              value={content}
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
