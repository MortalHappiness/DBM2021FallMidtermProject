import { useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";

import {
  BLOCK_TASK_MUTATION,
  GET_TASK_QUERY,
  UNBLOCK_TASK_MUTATION,
} from "../../graphql";
import TaskId from "./TaskId";

const styles = {
  titleBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkedTaskBox: {
    display: "flex",
  },
  linkedTaskBoxTitle: {
    marginLeft: "10px",
  },
};

function TaskList({ tasks, navigateToTask, deleteTask }) {
  return (
    <List dense>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          disablePadding
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteTask(task.id)}
            >
              <ClearIcon />
            </IconButton>
          }
        >
          <ListItemButton
            dense
            alignItems={"flex-start"}
            onClick={() => navigateToTask(task.id)}
          >
            <ListItemText
              primary={
                <Box sx={styles.linkedTaskBox}>
                  <TaskId taskId={task.id} />
                  <Typography
                    sx={styles.linkedTaskBoxTitle}
                    variant="body2"
                    component="div"
                  >
                    {task.title}
                  </Typography>
                </Box>
              }
              disableTypography
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default function LinkedTasks({
  taskId,
  tasks,
  blockedBy,
  blocks,
  refetchTask,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [unblockTask] = useMutation(UNBLOCK_TASK_MUTATION);
  console.log(tasks);
  console.log(blockedBy);
  console.log(blocks);

  const navigateToTask = (id) => {
    navigate(`${location.pathname}?taskId=${id}`);
  };

  const deleteBlockedByTask = async (id) => {
    await unblockTask({
      variables: { blockingTaskId: taskId, blockerTaskId: id },
    });
    await refetchTask({ taskId });
    await refetchTask({ taskId: id });
  };
  const deleteBlocksTask = async (id) => {
    await unblockTask({
      variables: { blockingTaskId: id, blockerTaskId: taskId },
    });
    await refetchTask({ taskId });
    await refetchTask({ taskId: id });
  };

  return (
    <Box>
      <Box sx={styles.titleBox}>
        <Typography variant="h6" component="div" sx={{ mt: 2 }} gutterBottom>
          Linked Tasks
        </Typography>
        <div>
          <IconButton>
            <AddIcon />
          </IconButton>
        </div>
      </Box>
      <Box>
        {blockedBy.length !== 0 && (
          <>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              Blocked By
            </Typography>
            <TaskList
              tasks={blockedBy}
              navigateToTask={navigateToTask}
              deleteTask={deleteBlockedByTask}
            />
          </>
        )}
        {blocks.length !== 0 && (
          <>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              Blocks
            </Typography>
            <TaskList
              tasks={blocks}
              navigateToTask={navigateToTask}
              deleteTask={deleteBlocksTask}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
