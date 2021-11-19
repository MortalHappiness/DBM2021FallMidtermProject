import { useQuery } from "@apollo/client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { GET_TASK_QUERY } from "../../graphql";
import Loading from "../../components/Loading";
import Title from "./Title";
import Description from "./Description";
import Comments from "./Comments";
import Dates from "./Dates";

const styles = {
  box: {
    position: "absolute",
    display: "flex",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  left: {
    width: "65%",
  },
  right: {
    width: "35%",
  },
};

export default function TaskContentModal({ open, onClose, taskId }) {
  const { loading, error, data } = useQuery(GET_TASK_QUERY, {
    variables: { taskId: parseInt(taskId) },
  });

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.box}>
        <Box sx={styles.left}>
          <Title taskId={taskId} defaultValue={data.task.title} />
          <Description taskId={taskId} defaultValue={data.task.content} />
          <Comments taskId={taskId} />
        </Box>
        <Box sx={styles.right}>
          <Dates
            createdAt={data.task.createdAt}
            updatedAt={data.task.updatedAt}
          />
        </Box>
      </Box>
    </Modal>
  );
}
