import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CREATE_LABEL_MUTATION, GET_PROJECT_QUERY } from "../graphql";

export default function CreateLabelForm({ projectId }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [createLabel] = useMutation(CREATE_LABEL_MUTATION, {
    refetchQueries: [GET_PROJECT_QUERY],
  });

  const add = () => {
    if (name && color) {
      createLabel({
        variables: {
          data: {
            name,
            color,
            projectId,
          },
        },
      });
      setShow(false);
    }
  };

  return (
    <Box>
      <Button onClick={() => setShow(true)}>Create Label</Button>

      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogTitle>Create Label</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            sx={{ my: 1 }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <InputLabel id="create-label-input">Color</InputLabel>
          <Input
            labelId="create-label-input"
            autoFocus
            fullWidth
            name="color"
            label="Color"
            type="color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
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
