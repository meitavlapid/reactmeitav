import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MyMap = () => {
  // מגדירים את המיקום במפה (למשל, תל אביב)
  const location = { lat: 32.0853, lng: 34.7818 };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAOX0OQ_hzQRr6HnWmuv5RwMnSsAeAqmB4">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={location}
        zoom={13}
      >
        {/* הוספת Marker על המיקום */}
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
