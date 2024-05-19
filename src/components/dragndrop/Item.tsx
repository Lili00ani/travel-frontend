import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { PlacePreview } from "../utilities/types";

interface ItemProps {
  place: PlacePreview;
  index: number;
}

const Item: React.FC<ItemProps> = ({ place, index }) => {
  return (
    <Draggable draggableId={place.id.toString()} index={index}>
      {(provided) => (
        <div
          className="px-2 py-2 mb-2 border bg-white border-gray-300 rounded"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>{place.name}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
