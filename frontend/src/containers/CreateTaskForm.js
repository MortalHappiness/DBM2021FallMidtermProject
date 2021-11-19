
import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CREATE_TASK_MUTATION } from "../graphql/mutations.js";

export default function CreateTaskForm({ projectId }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createTask] = useMutation(CREATE_TASK_MUTATION);

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
      <Button onClick={() => setShow(true)}>
        Create Task
      </Button>

      <Dialog
        open={show}
        onClose={() => setShow(false)}>
        <DialogTitle>
          Create Task
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="title"
            label="Title"
            fullWidth
            variant="standard"
            sx={{ my: 1 }}
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            autoFocus
            name="content"
            label="Content"
            fullWidth
            variant="standard"
            sx={{ my: 1 }}
            onChange={e => setContent(e.target.value)}
            value={content}
          />
        </DialogContent>
        <DialogActions>
          <Box
            mx={"auto"} my={0}
            sx={{ color: '#999999', fontSize: 13, display: 'inline' }}>
            <span> The content will keep if temparary close the pop-up. </span>
          </Box>
          <Button
            onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            onClick={add}
            variant="contained"
            color="success">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}