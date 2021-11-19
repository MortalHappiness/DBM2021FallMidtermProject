import { useQuery, useMutation } from "@apollo/client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { GET_TASK_QUERY, UPDATE_TASK_MUTATION } from "../../graphql";
import Loading from "../../components/Loading";
import { Title } from "./Title";
import { Description } from "./Description";

const ENTER_KEY = 13;

const styles = {
  box: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
};

export default function TaskContentModal({ open, onClose, taskId }) {
  const { loading, error, data } = useQuery(GET_TASK_QUERY, {
    variables: { taskId: parseInt(taskId) },
  });
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  const handleTitleChange = async (e) => {
    await updateTask({
      variables: { taskId: parseInt(taskId), data: { title: e.target.value } },
    });
  };

  const handleContentChange = async (e) => {
    await updateTask({
      variables: {
        taskId: parseInt(taskId),
        data: { content: e.target.value },
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.box}>
        <Title
          id="title"
          fullWidth
          defaultValue={data.task.title}
          onBlur={handleTitleChange}
          onKeyDown={(e) => {
            if (e.keyCode === ENTER_KEY) {
              e.target.blur();
            }
          }}
        />
        <Typography variant="h6" component="div" sx={{ mt: 2 }} gutterBottom>
          Description
        </Typography>
        <Description
          id="description"
          fullWidth
          multiline
          defaultValue={data.task.content}
          onBlur={handleContentChange}
        />
      </Box>
    </Modal>
  );
}
