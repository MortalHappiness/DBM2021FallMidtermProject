import { useMutation } from "@apollo/client";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { UPDATE_TASK_MUTATION } from "../../graphql";

const DescriptionTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      backgroundColor: "rgba(0, 0, 0, 0.09)",
    },
  },
}));

export default function Description({ taskId, defaultValue }) {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  const handleContentChange = async (e) => {
    await updateTask({
      variables: {
        taskId: parseInt(taskId),
        data: { content: e.target.value },
      },
    });
  };

  return (
    <>
      <Typography variant="h6" component="div" sx={{ mt: 2 }} gutterBottom>
        Description
      </Typography>
      <DescriptionTextField
        id="description"
        fullWidth
        multiline
        defaultValue={defaultValue}
        onBlur={handleContentChange}
      />
    </>
  );
}
