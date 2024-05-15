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

export interface Place {
  placeId: string;
  lat: number;
  lng: number;
  description: string;
  formattedAddress: string;
}

export const PlacesAutoComplete: React.FC = () => {
  const [place, setPlace] = useState<Place | null>(null);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setPlace(null);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const result = await getGeocode({ address });
      console.log(result);
      const { place_id, formatted_address } = result[0];
      const { lat, lng } = await getLatLng(result[0]);
      const selectedPlace: Place = {
        placeId: place_id,
        lat: lat,
        lng: lng,
        description: address,
        formattedAddress: formatted_address,
      };
      setPlace(selectedPlace);
    } catch (error) {
      console.error("Error getting geocode or lat/lng: ", error);
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
          {place && (
            <Button className="flex w-full my-3"> Add to your list</Button>
          )}
        </div>
        <div className="col-span-3">
          <MapComponent place={place} />
        </div>
      </div>
    </>
  );
};
