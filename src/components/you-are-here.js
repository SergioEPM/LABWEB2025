import { useEffect, useState } from "react";
import { middleOfUSA } from "../lib/constants";
import { Popup, useMap } from "@vis.gl/react-maplibre";
import { getLocation } from "../lib/api";
import React from "react";

export default function YouAreHere() {
  const [popupLocation, setPopupLocation] = useState(middleOfUSA);
  const map = useMap()?.current;

  useEffect(() => {
    if (!map) return;

    const fetchLocation = async () => {
      try {
        const location = await getLocation();
        if (location && location !== middleOfUSA) {
          setPopupLocation(location);
          map.flyTo({ center: location, zoom: 8 });
        }
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };

    fetchLocation();
  }, [map]);

  if (!map) return null;

  return (
    <Popup longitude={popupLocation[0]} latitude={popupLocation[1]}>
      <h3>You are approximately here!</h3>
    </Popup>
  );
}