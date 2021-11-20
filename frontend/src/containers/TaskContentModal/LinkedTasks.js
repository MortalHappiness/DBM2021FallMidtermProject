import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { BLOCK_TASK_MUTATION, UNBLOCK_TASK_MUTATION } from "../../graphql";
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

const linkTypes = { BLOCKED_BY: 1, BLOCKS: 2 };

function TaskList({ tasks, navigateToTask, deleteTask }) {
  return (
    <List dense>
      {tasks.map((task) => (
        <ListItem
          sx={{ boxShadow: 2 }}
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

export default function LinkedTasks({ taskId, tasks, blockedBy, blocks }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [blockTask] = useMutation(BLOCK_TASK_MUTATION, {
    refetchQueries: ["GetTaskQuery"],
  });
  const [unblockTask] = useMutation(UNBLOCK_TASK_MUTATION, {
    refetchQueries: ["GetTaskQuery"],
  });
  const [linkType, setLinkType] = useState(linkTypes.BLOCKED_BY);
  const [linkedTaskId, setLinkedTaskId] = useState(null);

  const canLinkedTasks = tasks.filter(
    (task) =>
      task.id !== taskId &&
      !blockedBy.some((blockedByTask) => blockedByTask.id === task.id) &&
      !blocks.some((blocksTask) => blocksTask.id === task.id)
  );

  const navigateToTask = (id) => {
    navigate(`${location.pathname}?taskId=${id}`);
  };

  const deleteBlockedByTask = async (id) => {
    await unblockTask({
      variables: { blockingTaskId: taskId, blockerTaskId: id },
    });
  };
  const deleteBlocksTask = async (id) => {
    await unblockTask({
      variables: { blockingTaskId: id, blockerTaskId: taskId },
    });
  };

  const handleLinkTypeChange = (e) => {
    setLinkType(e.target.value);
  };
  const handleLinkedTaskIdChange = (e) => {
    setLinkedTaskId(e.target.value);
  };

  const handleLinkTaskFormSubmit = async () => {
    if (linkType === linkTypes.BLOCKED_BY) {
      await blockTask({
        variables: { blockingTaskId: taskId, blockerTaskId: linkedTaskId },
      });
    } else {
      await blockTask({
        variables: { blockingTaskId: linkedTaskId, blockerTaskId: taskId },
      });
    }
    setLinkType(linkTypes.BLOCKED_BY);
    setLinkedTaskId(null);
  };
  const handleLinkTaskFormCancel = () => {
    setLinkType(linkTypes.BLOCKED_BY);
    setLinkedTaskId(null);
  };

  return (
    <Box>
      <Box sx={styles.titleBox}>
        <Typography variant="h6" component="div" sx={{ mt: 2 }} gutterBottom>
          Linked Tasks
        </Typography>
        <div>
          <IconButton onClick={() => setLinkedTaskId("")}>
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
        {linkedTaskId !== null && (
          <Box sx={{ marginTop: "10px" }}>
            <Box sx={{ display: "flex" }}>
              <FormControl sx={{ minWidth: 150, marginRight: "20px" }}>
                <Select value={linkType} onChange={handleLinkTypeChange}>
                  <MenuItem value={linkTypes.BLOCKED_BY}>
                    is blocked by
                  </MenuItem>
                  <MenuItem value={linkTypes.BLOCKS}>blocks</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="linked-task-id-label">Linked Task</InputLabel>
                <Select
                  labelId="linked-task-id-label"
                  id="linked-task-id"
                  value={linkedTaskId}
                  label="Linked Task"
                  onChange={handleLinkedTaskIdChange}
                >
                  {canLinkedTasks.map((task) => (
                    <MenuItem key={task.id} value={task.id}>
                      <TaskId taskId={task.id} />
                      <Typography
                        sx={styles.linkedTaskBoxTitle}
                        variant="body2"
                        component="div"
                      >
                        {task.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                marginTop: "5px",
                color: "text.secondary",
                display: "flex",
                justifyContent: "flex-end",
                gap: "5px",
              }}
              edge="end"
            >
              <Button
                size="small"
                type="submit"
                variant="contained"
                disabled={!Boolean(linkedTaskId)}
                onClick={handleLinkTaskFormSubmit}
              >
                Link
              </Button>
              <Button
                size="small"
                type="cancel"
                color="inherit"
                onClick={handleLinkTaskFormCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
