import { useQuery } from "@apollo/client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { GET_TASK_QUERY } from "../graphql";
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

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {data.task.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {data.task.content}
        </Typography>
      </Box>
    </Modal>
  );
}
