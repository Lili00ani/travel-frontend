import React from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const columnName = id === "saved" ? "saved" : `day${id}`;

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="">
          <h2>{columnName}</h2>
          <div
            className="px-4 py-4 rounded-lg"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((text, index) => (
              <Item key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
