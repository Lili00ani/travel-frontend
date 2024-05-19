import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { PlacePreview } from "../../utilities/types";

// interface ColumnProps {
//   col: {
//     id: string;
//     list: string[];
//   };
// }

interface ColumnProps {
  col: {
    id: string;
    list: PlacePreview[];
  };
}

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const columnName = id === "saved" ? "Saved" : `Day ${id}`;

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="mx-3">
          <h2 className="sticky top-0 bg-white z-10 h-10 ">{columnName}</h2>
          <div
            className="mt-6 h-full w-60 overflow-y-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((place, index) => (
              <Item key={place.id} place={place} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
