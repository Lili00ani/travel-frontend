//-----------Libraries-----------//
import { Card } from "flowbite-react";
import React, { FunctionComponent } from "react";
import DateRangeComponent from "./DateRange";
import { TravelCard } from "../utilities/types";

const PreviewCard: FunctionComponent<TravelCard> = (props) => {
  return (
    <Card href={`./${props.id}/organize`} className="w-full h-60 py-5 px-5">
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
