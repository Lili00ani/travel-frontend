import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { MapComponent } from "./Map";
import { useState } from "react";
import { Button } from "flowbite-react";
import { Place } from "../../utilities/types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import axios from "axios";
import { useParams } from "react-router-dom";

export interface MapProps {
  placeId: string;
  lat: number;
  lng: number;
  description: string;
  formattedAddress: string;
}

export const PlacesAutoComplete: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<MapProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [newPlace, setNewPlace] = useState<Place | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSelectedPlace(null);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const result = await getGeocode({ address });
      console.log(result);
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
      };
      setSelectedPlace(selectedPlace);
      setNewPlace(newToAdd);
    } catch (error) {
      console.error("Error getting geocode or lat/lng: ", error);
    }
  };

  const handleAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    setLoading(true);
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
      // setPlace();
      setSelectedPlace(null);
      setNewPlace(null);
      setValue("");
      console.log("success");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 h-screen">
        <div className="col-span-1">
          <Combobox onSelect={handleSelect}>
            <ComboboxInput
              value={value}
              onChange={handleInputChange}
              disabled={!ready}
              placeholder="Select Your Location"
              style={{
                width: "100%",
                border: "1px solid black",
                padding: "0.5rem",
                borderRadius: "0.25rem",
              }}
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ description, place_id }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
          {selectedPlace && (
            <Button onClick={handleAdd} className="flex w-full my-3">
              Add to your list
            </Button>
          )}
        </div>
        <div className="col-span-3">
          <MapComponent place={selectedPlace} />
        </div>
      </div>
    </>
  );
};
