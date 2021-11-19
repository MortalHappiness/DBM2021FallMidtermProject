import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import update from "immutability-helper";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { GET_PROJECT_QUERY, UPDATE_TASK_MUTATION } from "../graphql";
import TaskBoard from "./TaskBoard";
import Loading from "../components/Loading";
import TaskContentModal from "./TaskContentModal";
import CreateTaskForm from "./CreateTaskForm";
import CreateLabelForm from "./CreateLabelForm";
import Grid from "@mui/material/Grid";

export default function ProjectPage() {
  const { id } = useParams();
  const projectId = parseInt(id) || null;
  const { loading, error, data } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId },
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  const columnNames = ["TODO", "IN_PROGRESS", "DONE"];
  const [lists, setLists] = useState(null);
  const search = new URLSearchParams(location.search);
  const taskId = parseInt(search.get("taskId")) || null;

  useEffect(() => {
    if (!data) return;
    const newLists = columnNames.map(() => []);
    data.project.tasks.forEach((task) => {
      const idx = columnNames.findIndex(
        (columnName) => columnName === task.status
      );
      newLists[idx].push(update(task, { id: { $set: task.id.toString() } }));
    });
    setLists(newLists);
  }, [data]);

  if (loading) return <Loading />;
  if (error) return `Error ${error}`;

  const navigateToTask = (id) => {
    navigate(`${location.pathname}?taskId=${id}`);
  };

  return (
    <div>
      <Container>
        <Box
          sx={{
            marginTop: 4,
          }}
        >
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs>
              <Typography component="h1" variant="h4">
                {data.project.name}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <CreateTaskForm projectId={projectId} />
            </Grid>
            <CreateLabelForm projectId={projectId} />
            <Grid item xs="auto"></Grid>
          </Grid>
          <Divider />
          {taskId !== null && (
            <TaskContentModal
              open={true}
              onClose={() => navigate(location.pathname)}
              taskId={taskId}
              projectLabels={data.project.labels}
            />
          )}
          <TaskBoard
            columnNames={columnNames}
            lists={lists}
            setLists={setLists}
            updateTask={updateTask}
            navigateToTask={navigateToTask}
          />
        </Box>
      </Container>
    </div>
  );
}
