import { Button, Datepicker, Label, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState, useContext } from "react";
import { Travel, Country } from "../utilities/types";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import { UserRContext } from "../providers/userProvider";
import { useAuth0 } from "@auth0/auth0-react";

const initialTravelState: Travel = {
  owner_id: "",
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
  const navigate = useNavigate();
  const value = useContext(UserRContext);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUserandCountries = async () => {
      setLoading(true);
      setTravel({ ...travel, ["owner_id"]: value?.user.userId! });
      try {
        const response = await axios.get(`${BACKEND_URL}/countries`);
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUserandCountries();
  }, []);

  const handleDateChange = (date: Date, fieldName: "start" | "end") => {
    setTravel({ ...travel, [fieldName]: date });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTravel({ ...travel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken, travel);
    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/travel`,
        { travel },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTravel(initialTravelState);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
      <form
        className="flex-col gap-4 w-9/12 md:w-6/12 lg:w-4/12 my-10"
        onSubmit={handleSubmit}
      >
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
          {/* end date cannot be earlier than start date */}
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
            required
            value={travel.country_code}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex w-full"
          >
            <option value="">Select a country</option>
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
