import React from "react";

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
}

const formatDate = (date: Date): string => {
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
