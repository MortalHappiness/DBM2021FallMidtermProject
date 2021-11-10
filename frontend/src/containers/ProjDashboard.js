
import Task from "./Task.js";
import TaskList from "./TaskList.js";
import TaskCreationForm from "./TaskCreationForm.js";
// import TaskUpdateForm from "./TaskUpdateForm.js";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { useState } from "react";

function ProjDashboard({ user, org, proj }) {

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
      console.log(viewTaskId);
      return (
        <Task {...{ 
          exit: () => setShowTaskList(true),
          taskId: viewTaskId,
        }} />
      );
    }
  }

  return (
    <div>
      <Container>
        <Box m={2}>
          <div>
            <h1> {proj.name} </h1>
          </div>
        </Box>
        {getTaskViewContent()}
      </Container>
    </div>
  );
}

export default ProjDashboard;