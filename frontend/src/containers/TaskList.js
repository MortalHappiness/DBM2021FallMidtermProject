
import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import update from "immutability-helper";

import {
  GET_TASKS_QUERY,
  DELETE_TASK_MUTATION,
  TASK_SUBSCRIPTION,
} from "../graphql";
import Loading from "../components/Loading";
import TaskItem from "./TaskItem";

export default function TaskList({ viewTask }) {
  const { loading, error, data, subscribeToMore } = useQuery(GET_TASKS_QUERY, {
    variables: {
      tasksOrderBy: [
        {
          id: "asc",
        },
      ],
    },
  });

  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);

  useEffect(() => {
    try {
      subscribeToMore({
        document: TASK_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { mutationType, task: newTask } =
            subscriptionData.data.taskSubscription;
          if (mutationType === "CREATED") {
            return update(prev, { tasks: { $push: [newTask] } });
          } else if (mutationType === "UPDATED") {
            const idx = prev.tasks.findIndex((task) => task.id === newTask.id);
            return update(prev, { tasks: { [idx]: { $merge: newTask } } });
          } else {
            // DELETED
            const idx = prev.tasks.findIndex((task) => task.id === newTask.id);
            return update(prev, { tasks: { $splice: [[idx, 1]] } });
          }
        },
      });
    } catch (e) { }
  }, [subscribeToMore]);

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.tasks.map((task) => (
        <TaskItem
          key={task.id}
          data={task}
          deleteTask={deleteTask}
          viewTask={viewTask}
        />
      ))}
    </div>
  );
}
