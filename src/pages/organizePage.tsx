import React, { useState, useEffect } from "react";
import Column from "../components/dragndrop/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useColumnsData } from "../components/hooks/useItinerariesData";
import { PlacePreview, PlaceUpdate } from "../components/utils/types";
import { ColumnsType } from "../components/hooks/useItinerariesData";
import { usePlaces } from "../components/hooks/usePlaces";
import { MapOrganize } from "../components/maps/MapItinerary";
import { useLoadScript } from "@react-google-maps/api";

export default function OrganizePage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });
  const { columns, isLoading } = useColumnsData();
  const [columnData, setColumnData] = useState<ColumnsType>(columns);
  const { updatePlace } = usePlaces();

  useEffect(() => {
    if (!isLoading && columns) {
      setColumnData(columns);
    }
  }, [isLoading, columns]);

  console.log(columnData);

  useEffect(() => {
    const updateBackend = async () => {
      const updates: Promise<void>[] = [];
      Object.keys(columnData).forEach((colId) => {
        columnData[colId].list.forEach((place, index) => {
          const updatedPlace: PlaceUpdate = {
            day: colId === "saved" ? 0 : parseInt(colId),
            idx: index,
          };
          updates.push(updatePlace(place.id, updatedPlace));
        });
      });

      try {
        await Promise.all(updates);
      } catch (error) {
        console.error("Failed to update place:", error);
      }
    };

    if (Object.keys(columnData).length > 0) {
      updateBackend();
    }
  }, [columnData, updatePlace]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination

    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columnData[source.droppableId];
    const end = columnData[destination.droppableId];

    console.log("Start", start);
    console.log("End", end);

    if (!start || !end) return;

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumnData((state) => ({ ...state, [newCol.id]: newCol }));

      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumnData((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <div className="w-10/12 my-10 mx-auto flex flex-col space-y-6">
      {!isLoading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col space-y-6 h-full">
            <div className="flex flex-row space-x-6 h-1/2">
              <div className="w-60 h-96 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Column col={columnData["saved"]} key="saved" />
              </div>
              <div className="flex-grow h-full">
                {isLoaded && <MapOrganize />}
              </div>
            </div>
            <hr className="h-px mt-2 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex space-x-3 h-96 overflow-y-auto">
              {Object.keys(columnData)
                .filter((id) => id !== "saved")
                .map((id) => (
                  <div key={id} className="w-60">
                    <Column col={columnData[id]} />
                  </div>
                ))}
            </div>
            <hr className="h-px mt-2 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
