
import Task from "./Task.js";
import TaskList from "./TaskList.js";
import TaskCreationForm from "./TaskCreationForm.js";
// import TaskUpdateForm from "./TaskUpdateForm.js";
import { Box } from "@mui/system";
import { Button, Container, Grid } from "@mui/material";
import { useState } from "react";

function ProjDashboard({ user, org, proj, exit }) {

  // TODO: fetch tasks in this proj
  // TODO: add label related things

  const [showTaskList, setShowTaskList] = useState(true);
  const [viewTaskId, setViewTaskId] = useState(0);

  const viewTask = (taskId) => {
    console.log('view task', taskId);
    setViewTaskId(taskId);
    setShowTaskList(false);
  };

  const getTaskViewContent = () => {
    if (showTaskList) {
      return (
        <Box>
          <Box m={2}>
            <TaskCreationForm />
          </Box>
          {/* <TaskUpdateForm />  */}
          <Box>
            <TaskList viewTask={viewTask} />
          </Box>
        </Box>
      );
    } else {
      return (
        <Task {...{
          exit: () => setShowTaskList(true),
          taskId: viewTaskId,
        }} />
      );
    }
  }

  const [showCountdown, setShowCountdown] = useState(false);
  const [deleteCountdown, setDeleteCountdown] = useState(10);
  const [hideShowCountdownTimeoutId, setHideShowCountdownTimeoutId] = useState(undefined);

  const triggerDelete = () => {
    setShowCountdown(true);
    if (hideShowCountdownTimeoutId) {
      clearTimeout(hideShowCountdownTimeoutId);
    }
    setHideShowCountdownTimeoutId(setTimeout(() => {
      setShowCountdown(false);
    }, 5000));

    if (deleteCountdown === 1) {
      console.log('yay deleted');
      // Do delete
      exit();
    }

    setDeleteCountdown(value => value - 1);
    setTimeout(() => setDeleteCountdown(value => value + 1), 1000);
  };

  return (
    <div>
      <Container>
        <Box m={2}>
          <Grid
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            container
            spacing={24}
          >
            <Grid item>
              <div>
                <h1> Project: {proj.name} </h1>
              </div>
            </Grid>
            <Grid item>
              <Grid
                container
                sx={{ justifyContent: "space-between", flexDirection: "column", alignItems: "flex-end" }}>
                <Grid item>
                  <Box mx={2} sx={{ display: "inline", color: "red" }} >
                    { showCountdown ? deleteCountdown : "" }
                  </Box>
                  <Button variant="contained" color="error" sx={{ display: "inline" }} onClick={triggerDelete}>
                    Delete this project
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={exit} sx={{ display: "block" }}>
                    Back to organization
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {getTaskViewContent()}
      </Container>
    </div>
  );
}

export default ProjDashboard;