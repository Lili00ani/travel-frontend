import { Button, Label, Spinner, TextInput, Modal } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker";
import React, { useEffect, useState, useContext } from "react";
import { Travel, Country } from "../utilities/types";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { useNavigate, useParams } from "react-router-dom";
import { UserRContext } from "../providers/userProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { useTravel } from "./hooks/useTravel";
import { HiOutlineExclamationCircle, HiArrowLeft } from "react-icons/hi";

const initialTravelState: Travel = {
  id: 0,
  owner_id: "",
  name: "",
  start: new Date(),
  end: new Date(),
  pax: 1,
  country_code: "",
  created_at: new Date(),
  updated_at: new Date(),
};

export type DateType = string | null | Date;

export type DateRangeType = {
  startDate: DateType;
  endDate: DateType;
};

export type DateValueType = DateRangeType | null;

const initialCountriesState: Country[] = [];

export function TravelForm() {
  const [travelState, setTravelState] = useState<Travel>(initialTravelState);
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>(initialCountriesState);
  const navigate = useNavigate();
  const value = useContext(UserRContext);
  const { getAccessTokenSilently } = useAuth0();
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const { id } = useParams();
  const { isLoading, travel } = useTravel();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchUserandCountries = async () => {
      setLoading(true);
      setTravelState({ ...travelState, ["owner_id"]: value?.user.userId! });
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

  useEffect(() => {
    const fetchExistingTravel = async () => {
      if (travel) {
        setTravelState(travel);
        setDateRange({ startDate: travel.start, endDate: travel.end });
      }
    };
    fetchExistingTravel();
  }, [travel]);

  const handleDateRangeChange = (newDateRange: DateValueType) => {
    setDateRange(newDateRange);
    if (newDateRange?.startDate && newDateRange?.endDate) {
      setTravelState({
        ...travelState,
        start: new Date(newDateRange.startDate),
        end: new Date(newDateRange.endDate),
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTravelState({ ...travelState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken, travelState);
    setLoading(true);
    try {
      if (travelState.id !== 0) {
        // Update existing travel plan
        await axios.put(
          `${BACKEND_URL}/travel/${travelState.id}`,
          travelState,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        // Create new travel plan
        await axios.post(`${BACKEND_URL}/travel`, travelState, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
      setTravelState(initialTravelState);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const accessToken = await getAccessTokenSilently();
    setLoading(true);
    try {
      await axios.delete(`${BACKEND_URL}/travel/${travelState.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  console.log(travelState);

  return (
    <>
      {loading && (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}

      <form
        className="flex-col gap-4 w-10/12 md:w-6/12 lg:w-5/12 my-10"
        onSubmit={handleSubmit}
      >
        <div>
          <button type="button" onClick={() => navigate("/home")}>
            <HiArrowLeft />
          </button>
          <div className="my-1 block">
            <Label htmlFor="name1" value="Travel Plan Name" />
          </div>
          <TextInput
            name="name"
            type="name"
            placeholder="Name"
            required
            value={travelState.name}
            onChange={handleInputChange}
          />
          <div className="my-1 block">
            <Label htmlFor="date1" value="Start Date" />
          </div>
          <div className="flex-row">
            <Datepicker
              value={dateRange}
              primaryColor={"yellow"}
              onChange={handleDateRangeChange}
            />
          </div>

          <div className="my-1 block">
            <Label htmlFor="name1" value="Number of Pax" />
          </div>
          <TextInput
            name="pax"
            type="number"
            placeholder="1"
            required
            value={travelState.pax}
            onChange={handleInputChange}
          />
          <div className="my-1 block">
            <Label htmlFor="country_code" value="Select Your Destination" />
          </div>
          <select
            id="country_code"
            name="country_code"
            required
            value={travelState.country_code}
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
        <div>
          <Button className="my-3 flex w-full" type="submit">
            Save
          </Button>
          {travel && (
            <Button
              className="my-3 flex w-full"
              type="button"
              onClick={() => setOpenModal(true)}
            >
              Delete
            </Button>
          )}
        </div>
      </form>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
