import { useMutation } from "@apollo/client";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { UPDATE_TASK_MUTATION } from "../../graphql";

export default function Comments({ taskId, defaultValue }) {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  return (
    <>
      <Typography variant="h6" component="div" sx={{ mt: 2 }} gutterBottom>
        Comments
      </Typography>
    </>
  );
}
