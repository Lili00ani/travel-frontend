import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { WithContext as ReactTags, Tag as ReactTag } from "react-tag-input";
import { TextInput, Button, Modal } from "flowbite-react";
import axios from "axios";
import { BACKEND_URL } from "../../constant";
import "./tag.css";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const Tag = ({
  travelId,
  placeId,
  tags: initialTags,
}: {
  travelId: string;
  placeId: number;
  tags: ReactTag[];
}) => {
  const [tags, setTags] = useState<ReactTag[]>(initialTags);
  const [suggestions, setSuggestions] = useState<ReactTag[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTag, setCurrentTag] = useState<ReactTag | null>(null);
  const [editedText, setEditedText] = useState("");
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(`${BACKEND_URL}/tags/all`, {
          params: { id: travelId },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const tagsData = response.data.map((tag: any) => ({
          id: tag.id.toString(),
          text: tag.name,
        }));
        setSuggestions(tagsData);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [travelId]);

  const handleDelete = async (i: number) => {
    const tagId = tags[i].id;
    try {
      const accessToken = await getAccessTokenSilently();
      await axios.delete(`${BACKEND_URL}/tags/${placeId}/${tagId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTags(tags.filter((tag, index) => index !== i));
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleAddition = async (tag: ReactTag) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.post(
        `${BACKEND_URL}/tags/${placeId}`,
        {
          travel_id: travelId,
          name: tag.text,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const newTag = {
        id: response.data.id.toString(),
        text: response.data.name,
      };
      setTags([...tags, newTag]);
      setSuggestions([...suggestions, newTag]);
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleTagClick = (index: number) => {
    const tag = tags[index];
    setCurrentTag(tag);
    setEditedText(tag.text);
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    if (currentTag) {
      try {
        const accessToken = await getAccessTokenSilently();
        await axios.put(
          `${BACKEND_URL}/tags/${currentTag.id}`,
          { name: editedText },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const updatedTags = tags.map((tag) =>
          tag.id === currentTag.id ? { ...tag, text: editedText } : tag
        );
        setTags(updatedTags);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating tag:", error);
      }
    }
  };

  return (
    <div>
      <div>
        {tags.length < 1 ? (
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="inline"
            placeholder="Add Category"
            allowDragDrop={false}
            autocomplete
            handleTagClick={handleTagClick}
          />
        ) : (
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="inline"
            placeholder=""
            allowDragDrop={false}
            autocomplete
            handleTagClick={handleTagClick}
          />
        )}
      </div>

      {isEditing && (
        <Modal show={isEditing} size="sm" onClose={() => setIsEditing(false)}>
          <Modal.Header>Edit Tag</Modal.Header>
          <Modal.Body>
            <TextInput
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Edit tag text"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleEditSave}>Save</Button>
            <Button color="gray" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
