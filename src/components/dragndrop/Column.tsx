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
  "decoration-blue-500/40",
  "decoration-green-400/40",
  "decoration-yellow-200/40",
  "decoration-purple-500/40",
  "decoration-orange-400/40",
  "decoration-pink-500/40",
  "decoration-red-500/40",
];

const savedColor = "decoration-transparent";

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const columnName = id === "saved" ? "😍Saved Places" : `Day ${id}`;
  const colorClass =
    id === "saved" ? savedColor : Colors[parseInt(id, 10) % Colors.length];

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="w-60 h-full">
          <h2
            className={`top-0 bg-white z-10 h-10 line-through decoration-20 ${colorClass} font-semibold`}
          >
            {columnName}
          </h2>
          <div
            className="mt-6 h-full overflow-y-auto   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((place, index) => (
              <Item key={place.id} place={place} index={index} />
            ))}
            {provided.placeholder}
            <div className="mb-8 pb-8"></div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
