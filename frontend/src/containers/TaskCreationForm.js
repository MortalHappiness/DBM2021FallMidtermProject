import { useState } from "react";
import { useMutation } from "@apollo/client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { CREATE_TASK_MUTATION } from "../graphql";
import { Box } from "@mui/system";
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material";

import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function TaskCreationForm() {
  const [showForm, setShowForm] = useState(false);
  const [createTask] = useMutation(CREATE_TASK_MUTATION);

  const openCreateForm = () => {
    setShowForm(true);
  };

  const closeCreateForm = () => {
    setShowForm(false);
  };

  // Handle input fields
  const [formInput, setFormInput] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    setFormInput((previousFormInput) => ({
      ...previousFormInput,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    createTask({ variables: { data: formInput } });
    closeCreateForm();
    setFormInput({ title: "", content: "" });
  };

  return (
    <Box>
      <Box>
        <Button variant="contained" color="primary" onClick={openCreateForm}>
          Create new task
        </Button>
      </Box>
      <Dialog 
        open={showForm} 
        onClose={closeCreateForm} 
        PaperComponent={PaperComponent} 
        aria-labelledby="draggable-dialog-title">
        <DialogTitle 
          style={{ cursor: 'move' }}>
          Create new task
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="title"
            label="Title"
            fullWidth
            variant="standard"
            sx={{ my: 1 }}
            onChange={handleChange}
            value={formInput.title}
          />
          <TextField
            name="content"
            label="Content"
            fullWidth
            variant="standard"
            multiline
            sx={{ my: 1 }}
            rows={3}
            onChange={handleChange}
            value={formInput.content}
          />
        </DialogContent>
        <DialogActions>
          <Box 
            mx={"auto"} my={0}
            sx={{ color: '#999999', fontSize: 13, display: 'inline' }}>
            <span> The content will keep if temparary close the pop-up. </span>
          </Box>
          <Button
            onClick={closeCreateForm}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
