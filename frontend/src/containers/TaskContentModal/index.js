import { useQuery } from "@apollo/client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { GET_TASK_QUERY } from "../../graphql";
import Loading from "../../components/Loading";
import Title from "./Title";
import Description from "./Description";
import Comments from "./Comments";
import Dates from "./Dates";
import Stack from "@mui/material/Stack";
import Label from "../../components/Label";
import LabelSelect from "../../components/LabelSelect";
import Author from "./Author";

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
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};

export default function TaskContentModal({
  open,
  onClose,
  taskId,
  projectLabels,
  users,
}) {
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
          <Author author={data.task.author.displayName} />
          <Divider />
          <Dates
            createdAt={data.task.createdAt}
            updatedAt={data.task.updatedAt}
          />
          <Stack direction="row" spacing={1}>
            {data.task.labels.map((label) => (
              <Label key={label.id} label={label} taskId={taskId} canDelete />
            ))}
          </Stack>
          <LabelSelect labels={projectLabels} taskId={taskId} />
        </Box>
      </Box>
    </Modal>
  );
}
