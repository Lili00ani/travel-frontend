import { Card, Dropdown, TextInput } from "flowbite-react";
import React, { FunctionComponent, useState } from "react";
import { WithContext as ReactTags, Tag as ReactTag } from "react-tag-input";
import { CustomTextInput } from "./flowbite/TextInput";
import { usePlaces } from "./hooks/usePlaces";
import { Tag } from "./tag/Tags";
import { useParams } from "react-router-dom";
import { CustomCard } from "./flowbite/Card";

export interface PlacePreview {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  index: number;
  notes: string;
  start: Date;
  end: Date;
  tags?: any;
}

export const PlacePreviewCard: FunctionComponent<PlacePreview> = (props) => {
  const { updatePlace } = usePlaces();
  const [notes, setNotes] = useState(props.notes || "");
  const { id } = useParams();
  const [tags, setTags] = useState(
    props.tags.map((tag: any) => ({
      id: tag.id.toString(),
      text: tag.name,
    }))
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    try {
      await updatePlace(props.id, { notes: newNotes });
      console.log("Notes updated successfully");
    } catch (error) {
      console.error("Failed to update notes", error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      theme={CustomCard}
      className="w-full py-1 px-1 relative hover:shadow-md hover:shadow-gray-500"
    >
      <div className="flex flex-col items-start">
        <div className="absolute top-2 left-2 flex items-center justify-center">
          {props.index + 1}
        </div>
        <div className="absolute top-2 right-2">
          <Dropdown inline label="">
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleEdit}
              >
                {isEditing ? "Cancel" : "Edit"}
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => props.onDelete(props.id)}
              >
                Delete
              </a>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div>
          <h5 className="line-clamp-2 text-1xl leading-none font-medium text-gray-900 dark:text-white mb-2">
            <a
              href={`./places/${props.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.name}
            </a>
          </h5>
          <form className="flex flex-col gap-2">
            {isEditing ? (
              <TextInput
                theme={CustomTextInput}
                id="notes"
                type="text"
                placeholder="Add Notes"
                value={notes}
                onChange={handleChange}
              />
            ) : (
              <p className="text-gray-700 text-md dark:text-gray-300">
                {notes}
              </p>
            )}
            <Tag travelId={id} placeId={props.id} tags={tags} />
          </form>
        </div>
      </div>
    </Card>
  );
};
