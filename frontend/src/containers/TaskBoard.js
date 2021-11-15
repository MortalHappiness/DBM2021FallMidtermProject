import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import update from "immutability-helper";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { GET_PROJECT_QUERY } from "../graphql";
import Loading from "../components/Loading";

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

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  margin: 20,
});

export default function TaskBoard({ columnNames, lists, setLists }) {
  const onDragEnd = (result) => {
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
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists?.map((el, ind) => (
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {columnNames[ind]}
                {el.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
