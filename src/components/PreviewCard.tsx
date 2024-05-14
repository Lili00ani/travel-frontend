//-----------Libraries-----------//
import { Card } from "flowbite-react";
import React, { FunctionComponent } from "react";
import DateRangeComponent from "./DateRange";

export interface PreviewCardProps {
  id: number;
  name: string;
  start: string;
  end: string;
  pax: number;
  country_code: string;
  created_at: string;
  updated_at: string;
}

const PreviewCard: FunctionComponent<PreviewCardProps> = (props) => {
  return (
    <Card href={`./${props.id}/organize`} className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <DateRangeComponent startDate={props.start} endDate={props.end} />
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.country_code}
      </p>
    </Card>
  );
};

export default PreviewCard;
