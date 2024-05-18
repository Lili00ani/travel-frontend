import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface ItemProps {
  text: string;
  index: number;
}

const Item: React.FC<ItemProps> = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div
          className="px-2 py-2  bg-gray-500 mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
