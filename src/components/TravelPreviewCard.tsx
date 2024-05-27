//-----------Libraries-----------//
import { Card } from "flowbite-react";
import React, { FunctionComponent } from "react";
import DateRangeComponent from "./utils/DateRange";
import { Travel } from "./utils/types";
import { MdEdit } from "react-icons/md";
import getFlagEmoji from "./utils/Flag";

const TravelPreviewCard: FunctionComponent<Travel> = (props) => {
  const startDate = new Date(props.start);
  const endDate = new Date(props.end);

  return (
    <Card href={`./${props.id}/places`} className="w-full h-48 md:py-5 md:px-5">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="md:text-2xl text-xl font-semibold leading-none text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <a
          href={`./${props.id}/edit`}
          className="md:text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          <MdEdit size={24} />
        </a>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.country_code}
        {/* {getFlagEmoji(props.country_code)} */}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <DateRangeComponent startDate={startDate} endDate={endDate} />
      </p>
    </Card>
  );
};

export default TravelPreviewCard;
