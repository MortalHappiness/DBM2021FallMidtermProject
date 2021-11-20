import { useQuery } from "@apollo/client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Container } from "@mui/material";

import { GET_TASK_QUERY } from "../../graphql";
import Loading from "../../components/Loading";
import Title from "./Title";
import Description from "./Description";
import LinkedTasks from "./LinkedTasks";
import Comments from "./Comments";
import Dates from "./Dates";
import Author from "./Author";
import Assignees from "./Assignees";
import Labels from "./Labels";

const styles = {
  box: {
    display: "flex",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  },
  verticalDivider: {
    margin: "0 25px",
  },
  left: {
    width: "60%",
    overflowY: "auto",
  },
  right: {
    width: "40%",
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
}) {
  const { loading, error, data } = useQuery(GET_TASK_QUERY, {
    variables: { taskId },
  });

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.box}>
        <Box sx={styles.left}>
          <Box sx={{ margin: "15px" }}>
            <Title taskId={taskId} defaultValue={data.task.title} />
            <Description taskId={taskId} defaultValue={data.task.content} />
            <LinkedTasks
              taskId={taskId}
              tasks={data.task.project.tasks}
              blockedBy={data.task.blockedBy}
              blocks={data.task.blocking}
            />
            <Comments taskId={taskId} comments={data.task.comments} />
          </Box>
        </Box>
        <Divider sx={styles.verticalDivider} flexItem orientation="vertical" />
        <Box sx={styles.right}>
          <Container>
            <Author author={data.task.author.displayName} />
            <Assignees
              taskId={taskId}
              users={data.task.project.organization.users}
              assignees={data.task.users}
            />
            <Labels
              canAdd
              canDelete
              taskId={taskId}
              activeLabels={data.task.labels}
              labels={projectLabels}
            />
            <Divider sx={{ margin: "20px 0" }} />
            <Dates
              createdAt={data.task.createdAt}
              updatedAt={data.task.updatedAt}
            />
          </Container>
        </Box>
      </Box>
    </Modal>
  );
}
