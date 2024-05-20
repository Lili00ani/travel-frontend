import { useEffect, useState } from "react";
import axios from "axios";
import { PlacePreview } from "../utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import { useParams } from "react-router-dom";
import { usePlaces } from "./usePlaces";

export interface ColumnType {
  id: string;
  list: PlacePreview[];
}

export interface ColumnsType {
  [key: string]: ColumnType;
}

const createInitialColumns = (duration: number): ColumnsType => {
  const columns: ColumnsType = {
    saved: {
      id: "saved",
      list: [],
    },
  };
  for (let day = 1; day <= duration + 1; day++) {
    columns[day] = {
      id: `${day}`,
      list: [],
    };
  }
  return columns;
};

export const useColumnsData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [columns, setColumns] = useState(createInitialColumns(0));
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const { places, isLoading: isLoadingPlaces } = usePlaces();

  useEffect(() => {
    const fetchTravelDuration = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(`${BACKEND_URL}/travel/duration`, {
          params: { id },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDuration(response.data);
        setColumns(createInitialColumns(response.data));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchTravelDuration();
  }, [id]);

  useEffect(() => {
    if (duration > 0 && places.length > 0) {
      const newColumns = createInitialColumns(duration);

      places.forEach((place: PlacePreview) => {
        const day = place.day;
        if (day === 0) {
          newColumns.saved.list.push(place);
        } else if (newColumns[day]) {
          newColumns[day].list.push(place);
        }
      });

      setColumns(newColumns);
    }
  }, [duration, places]);

  return { columns, isLoading: isLoading || isLoadingPlaces };
};
