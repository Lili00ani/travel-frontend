import React, { useState, useEffect } from "react";
import Column from "../components/dragndrop/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useColumnsData } from "../components/hooks/useItinerariesData";
import { PlacePreview } from "../utilities/types";

interface ColumnType {
  id: string;
  list: PlacePreview[];
}

interface ColumnsType {
  [key: string]: ColumnType;
}

export default function OrganizePage() {
  const { columns, isLoading } = useColumnsData();
  const [columnData, setColumnData] = useState<ColumnsType>(columns);

  useEffect(() => {
    if (!isLoading && columns) {
      setColumnData(columns);
    }
  }, [isLoading, columns]);

  console.log(columnData);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination

    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columnData[source.droppableId];
    const end = columnData[destination.droppableId];

    console.log("Start", start);
    console.log("End", end);

    if (!start || !end) return;

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumnData((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumnData((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <>
      {!isLoading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4">
            {Object.values(columnData).map((col) => (
              <Column col={col} key={col.id} />
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
}
