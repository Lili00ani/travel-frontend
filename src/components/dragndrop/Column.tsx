import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { PlacePreview } from "../utils/types";

interface ColumnProps {
  col: {
    id: string;
    list: PlacePreview[];
  };
}

const Colors = [
  "decoration-transparent",
  "decoration-blue-500/40",
  "decoration-green-500/40",
  "decoration-yellow-500/40",
  "decoration-purple-500/40",
  "decoration-orange-500/40",
  "decoration-pink-500/40",
  "decoration-red-500/40",
];

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const columnName = id === "saved" ? "😍Saved Places" : `Day ${id}`;

  const colorIndex = id === "saved" ? 0 : parseInt(id, 10) % Colors.length;
  const colorClass = Colors[colorIndex];

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="w-60 h-full">
          <h2
            className={`sticky top-0 bg-white z-10 h-10 line-through decoration-20 ${colorClass} font-semibold`}
          >
            {columnName}
          </h2>
          <div
            className="mt-6 h-full overflow-y-auto"
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
