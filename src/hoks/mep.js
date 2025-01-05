import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ location }) => (
  <LoadScript googleMapsApiKey="YOUR_API_KEY">
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%" }}
      zoom={15}
      center={location}
    >
      <Marker position={location} />
    </GoogleMap>
  </LoadScript>
);

export default Map;
