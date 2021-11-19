import { useQuery, useMutation } from "@apollo/client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { GET_TASK_QUERY, UPDATE_TASK_MUTATION } from "../graphql";
import Loading from "../components/Loading";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TaskContentModal({ open, onClose, taskId }) {
  const { loading, error, data } = useQuery(GET_TASK_QUERY, {
    variables: { taskId: parseInt(taskId) },
  });
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  const handleTitleChange = async (e) => {
    console.log(e.target.value);
    await updateTask({
      variables: { taskId: parseInt(taskId), data: { title: e.target.value } },
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <TextField
          id="task-title"
          fullWidth
          defaultValue={data.task.title}
          onBlur={handleTitleChange}
          onKeyDown={(e) => {
            // ENTER key
            if (e.keyCode === 13) {
              e.target.blur();
            }
          }}
        ></TextField>
        <Typography id="task-description" sx={{ mt: 2 }}>
          {data.task.content}
        </Typography>
      </Box>
    </Modal>
  );
}
