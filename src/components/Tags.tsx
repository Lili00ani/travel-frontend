// import React, { useState } from "react";
// import { WithContext as ReactTags } from "react-tag-input";
// import { TextInput } from "flowbite-react";

// const suggestions = [
//   { id: "Thailand", text: "Thailand" },
//   { id: "India", text: "India" },
//   { id: "Vietnam", text: "Vietnam" },
//   { id: "Turkey", text: "Turkey" },
//   { id: "Indonesia", text: "Indonesia" },
// ];

// const KeyCodes = {
//   comma: 188,
//   enter: 13,
// };

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

// export interface tag {
//   id: string;
//   text: string;
// }

// export const Tag = () => {
//   const [tags, setTags] = useState([{ id: "Thailand", text: "Thailand" }]);

//   const handleDelete = (i: number) => {
//     setTags(tags.filter((tag, index) => index !== i));
//   };

//   const handleAddition = (tag: tag) => {
//     setTags([...tags, tag]);
//   };

//   const handleTagClick = (index: number) => {
//     console.log("The tag at index " + index + " was clicked");
//   };

//   return (
//     <div>
//       <div className="flex w-full">
//         <ReactTags
//           tags={tags}
//           suggestions={suggestions}
//           delimiters={delimiters}
//           handleDelete={handleDelete}
//           handleAddition={handleAddition}
//           inputFieldPosition="inline"
//           allowDragDrop={false}
//           autocomplete
//           // editable={true}
//           handleTagClick={handleTagClick}
//         />
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { TextInput, Button, Modal, Popover } from "flowbite-react";

const suggestions = [
  { id: "Thailand", text: "Thailand" },
  { id: "India", text: "India" },
  { id: "Vietnam", text: "Vietnam" },
  { id: "Turkey", text: "Turkey" },
  { id: "Indonesia", text: "Indonesia" },
];

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export interface tag {
  id: string;
  text: string;
}

export const Tag = () => {
  const [tags, setTags] = useState([{ id: "Thailand", text: "Thailand" }]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTag, setCurrentTag] = useState<tag | null>(null);
  const [editedText, setEditedText] = useState("");

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: tag) => {
    setTags([...tags, tag]);
  };

  const handleTagClick = (index: number) => {
    const tag = tags[index];
    setCurrentTag(tag);
    setEditedText(tag.text);
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (currentTag) {
      const updatedTags = tags.map((tag) =>
        tag.id === currentTag.id ? { ...tag, text: editedText } : tag
      );
      setTags(updatedTags);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="inline"
          allowDragDrop={false}
          autocomplete
          handleTagClick={handleTagClick}
        />
      </div>

      {/* {isEditing && (
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
      )} */}

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
