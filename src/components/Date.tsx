import React, { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const DateTry: React.FC = () => {
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return <Datepicker value={value} onChange={handleValueChange} />;
};

export default DateTry;
