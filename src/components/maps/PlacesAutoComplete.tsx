import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Place } from "../utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import axios from "axios";
import { useParams } from "react-router-dom";
import { usePlaces } from "../hooks/usePlaces";
import { useTravel } from "../hooks/useTravel";

export interface MapProps {
  placeId: string;
  lat: number;
  lng: number;
  description: string;
  formattedAddress: string;
}

interface PlacesAutoCompleteProps {
  setSelectedPlace: (place: MapProps | null) => void;
}

export const PlacesAutoComplete: React.FC<PlacesAutoCompleteProps> = ({
  setSelectedPlace,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newPlace, setNewPlace] = useState<Place | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const { fetchAllPlaces } = usePlaces();
  const { isLoading, travel } = useTravel();

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: travel && travel!.country_code },
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSelectedPlace(null);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const result = await getGeocode({ address });
      const { place_id, formatted_address } = result[0];
      const { lat, lng } = await getLatLng(result[0]);

      const selectedPlace: MapProps = {
        placeId: place_id,
        lat: lat,
        lng: lng,
        description: address,
        formattedAddress: formatted_address,
      };
      const newToAdd: Place = {
        travel_id: Number(id),
        google_places: place_id,
        lat: lat,
        lng: lng,
        notes: "",
        name: address,
        address: "",
        day: 0,
        idx: 0,
      };
      setSelectedPlace(selectedPlace);
      setNewPlace(newToAdd);
    } catch (error) {
      console.error("Error getting geocode or lat/lng: ", error);
    }
  };

  console.log(newPlace);

  const handleAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    setLoading(true);
    console.log(newPlace);
    try {
      await axios.post(
        `${BACKEND_URL}/place`,
        { newPlace },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const empty: MapProps = {
        placeId: "",
        lat: 0,
        lng: 0,
        description: "",
        formattedAddress: "",
      };
      setSelectedPlace(empty);
      setNewPlace(null);
      setValue("");
      fetchAllPlaces();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row">
      <div className={`${newPlace ? "flex-grow" : "w-full"}`}>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInputChange}
            disabled={!ready}
            placeholder="Find and add your travel spot 😄"
            style={{
              width: "100%",
              border: "1px solid black",
              padding: "0.5rem",
              borderRadius: "0.25rem",
            }}
          />
          <ComboboxPopover>
            <ComboboxList className="bg-white">
              {status === "OK" &&
                data.map(({ description, place_id }) => (
                  <ComboboxOption
                    key={place_id}
                    value={description}
                    className="hover:bg-gray-100 line-clamp-1 h-8 border-t border-gray-300"
                  />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
      <div>
        {newPlace && (
          <Button color="dark" onClick={handleAdd} className="ml-3">
            Add
          </Button>
        )}
      </div>
    </div>
  );
};
