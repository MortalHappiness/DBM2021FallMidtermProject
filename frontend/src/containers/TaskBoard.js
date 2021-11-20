import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Label from "../components/Label";
import TaskId from "./TaskContentModal/TaskId";

const DisplayColumnNames = ["TODO", "IN PROGRESS", "DONE"];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  result.removed = removed;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  cursor: "pointer",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, listSize) => ({
  background: isDraggingOver ? "lightblue" : "hsl(0deg 0% 90%)",
});

export default function TaskBoard({
  columnNames,
  lists,
  setLists,
  updateTask,
  navigateToTask,
}) {
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(lists[sInd], source.index, destination.index);
      const newLists = [...lists];
      newLists[sInd] = items;
      setLists(newLists);
    } else {
      const result = move(lists[sInd], lists[dInd], source, destination);
      const newLists = [...lists];
      newLists[sInd] = result[sInd];
      newLists[dInd] = result[dInd];

      setLists(newLists);
      await updateTask({
        variables: {
          taskId: parseInt(result.removed.id),
          data: { status: columnNames[dInd] },
        },
      });
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2rem",
        margin: "1rem",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {lists?.map((el, ind) => (
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
                sx={{ p: 2 }}
              >
                <Typography
                  sx={{ userSelect: "none", fontWeight: "bold" }}
                  variant="h5"
                  gutterBottom
                  component="div"
                >
                  {DisplayColumnNames[ind]}
                </Typography>
                {el.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        onClick={() => navigateToTask(item.id)}
                      >
                        <CardContent>
                          <TaskId taskId={item.id} />
                          <Typography variant="h5" component="div" gutterBottom>
                            {item.title}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            {item.labels.map((label) => (
                              <Label
                                key={label.id}
                                label={label}
                                taskId={item.id}
                              />
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
