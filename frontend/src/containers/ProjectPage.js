import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import update from "immutability-helper";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { GET_PROJECT_QUERY } from "../graphql";
import TaskBoard from "./TaskBoard";
import Loading from "../components/Loading";

export default function ProjectPage() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId: parseInt(id) },
  });
  const columnNames = ["TODO", "IN_PROGRESS", "DONE"];
  const [lists, setLists] = useState(null);

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

  return (
    <div>
      <Container>
        <Box
          sx={{
            marginTop: 4,
          }}
        >
          <Typography component="h1" variant="h4">
            {data.project.name}
          </Typography>
          <Divider />
          <TaskBoard
            columnNames={columnNames}
            lists={lists}
            setLists={setLists}
          />
        </Box>
      </Container>
    </div>
  );
}
