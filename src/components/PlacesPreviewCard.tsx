//-----------Libraries-----------//
import { Card, Dropdown, TextInput } from "flowbite-react";
import React, { FunctionComponent } from "react";
import { CustomTextInput } from "./flowbite/TextInput";

export interface PlacePreview {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  index: number;
}

export const PlacePreviewCard: FunctionComponent<PlacePreview> = (props) => {
  return (
    <Card className="w-full py-1 px-1 relative">
      <div className="flex flex-col">
        <div className="absolute top-2 left-2 flex items-center justify-center">
          {props.index + 1}
        </div>
        <div className="absolute top-2 right-2">
          <Dropdown inline label="">
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
          <h5 className="line-clamp-3 text-1xl leading-none text-gray-900 dark:text-white mb-2">
            <a href={`./places/${props.id}`}>{props.name}</a>
          </h5>
          <form>
            <TextInput
              theme={CustomTextInput}
              id="tags"
              type="text"
              placeholder="Notes"
            />
          </form>
        </div>
      </div>
    </Card>
  );
};
