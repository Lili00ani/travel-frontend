import React from "react";

interface DateRangeProps {
  startDate: string;
  endDate: string;
}

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const DateRangeComponent: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
}) => {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <div>
      {formattedStartDate} - {formattedEndDate}
    </div>
  );
};

export default DateRangeComponent;
