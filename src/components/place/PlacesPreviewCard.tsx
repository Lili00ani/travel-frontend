//-----------Libraries-----------//
import { Card } from "flowbite-react";
import React, { FunctionComponent } from "react";

export interface PlacePreview {
  id: number;
  name: string;
}

export const PlacePreviewCard: FunctionComponent<PlacePreview> = (props) => {
  return (
    <Card href={`./${props.id}/organize`} className="w-full py-3 px-3">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-1xl leading-none text-gray-900 dark:text-white">
          {props.name}
        </h5>
      </div>
    </Card>
  );
};
