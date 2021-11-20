import { useMutation } from "@apollo/client";

import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import { UPDATE_TASK_MUTATION } from "../../graphql";
import TaskId from "./TaskId";

const ENTER_KEY = 13;

const TitleTextFeild = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& input": {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
      backgroundColor: "rgba(0, 0, 0, 0.09)",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function Title({ taskId, defaultValue }) {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  const handleTitleChange = async (e) => {
    await updateTask({
      variables: { taskId: parseInt(taskId), data: { title: e.target.value } },
    });
  };

  return (
    <>
      <TaskId taskId={taskId} />
      <TitleTextFeild
        id="title"
        fullWidth
        defaultValue={defaultValue}
        onBlur={handleTitleChange}
        onKeyDown={(e) => {
          if (e.keyCode === ENTER_KEY) {
            e.target.blur();
          }
        }}
      />
    </>
  );
}
