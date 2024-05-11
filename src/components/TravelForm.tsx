import { Button, Datepicker, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Travel, Country } from "../utilities/types";
import axios from "axios";
import { BACKEND_URL } from "../constant";

const initialTravelState: Travel = {
  name: "",
  start: new Date(),
  end: new Date(),
  pax: 1,
  country_code: "",
};
const initialCountriesState: Country[] = [];

export function TravelForm() {
  const [travel, setTravel] = useState<Travel>(initialTravelState);
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>(initialCountriesState);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/countries`);
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleDateChange = (date: Date, fieldName: "start" | "end") => {
    setTravel({ ...travel, [fieldName]: date });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTravel({ ...travel, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading && (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
      <form className="flex-col gap-4 w-9/12 md:w-6/12 lg:w-4/12 my-10">
        <div>
          <div className="my-1 block">
            <Label htmlFor="name1" value="Travel Plan Name" />
          </div>
          <TextInput
            name="name"
            type="name"
            placeholder="Name"
            required
            value={travel.name}
            onChange={handleInputChange}
          />
          <div className="my-1 block">
            <Label htmlFor="date1" value="Start Date" />
          </div>
          <Datepicker
            required
            id="date"
            onSelectedDateChanged={(date) => handleDateChange(date, "start")}
          />
          <div className="my-1 block">
            <Label htmlFor="date1" value="End Date" />
          </div>
          <Datepicker
            required
            id="date"
            onSelectedDateChanged={(date) => handleDateChange(date, "end")}
          />
          <div className="my-1 block">
            <Label htmlFor="name1" value="Number of Pax" />
          </div>
          <TextInput
            name="pax"
            type="number"
            placeholder="1"
            required
            value={travel.pax}
            onChange={handleInputChange}
          />
          <div className="my-1 block">
            <Label htmlFor="country_code" value="Select Your Destination" />
          </div>
          <select
            id="country_code"
            name="country_code"
            value={travel.country_code}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <Button className="my-10 flex w-full" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
