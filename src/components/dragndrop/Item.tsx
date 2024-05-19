import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { PlacePreview } from "../utils/types";
import { TextInput } from "flowbite-react";
import { CustomTextInput } from "../flowbite/TextInput";
import { usePlaces } from "../hooks/usePlaces";
import { useState } from "react";

interface ItemProps {
  place: PlacePreview;
  index: number;
}

const Item: React.FC<ItemProps> = ({ place, index }) => {
  const { updatePlace } = usePlaces();
  const [notes, setNotes] = useState(place.notes || "");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    try {
      await updatePlace(place.id, { notes: newNotes });
      console.log("Notes updated successfully");
    } catch (error) {
      console.error("Failed to update notes", error);
    }
  };

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
          <form>
            <TextInput
              theme={CustomTextInput}
              id="tags"
              type="text"
              placeholder="Notes"
              value={notes}
              onChange={handleChange}
            />
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
