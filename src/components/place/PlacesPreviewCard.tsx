//-----------Libraries-----------//
import { Card, Dropdown } from "flowbite-react";
import React, { FunctionComponent } from "react";

export interface PlacePreview {
  id: number;
  name: string;
  onDelete: (id: number) => void;
}

export const PlacePreviewCard: FunctionComponent<PlacePreview> = (props) => {
  return (
    <Card className="w-full py-1 px-1 relative">
      <div className="flex flex-col">
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
            {props.name}
          </h5>
          <p className="text-sm leading-none text-gray-900 dark:text-white">
            category
          </p>
        </div>
      </div>
    </Card>
  );
};
