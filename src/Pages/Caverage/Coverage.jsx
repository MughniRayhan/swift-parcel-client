import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {MapContainer,TileLayer,Marker,Popup,useMap} from "react-leaflet";
import L from "leaflet";
import { useLoaderData } from "react-router";

// Fix Leaflet marker icon (important for production)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Component to control map movement
function MapController({ searchTarget }) {
  const map = useMap();

  useEffect(() => {
    if (searchTarget) {
      map.flyTo([searchTarget.latitude, searchTarget.longitude], 10, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [searchTarget]);

  return null;
}

function Coverage() {
  const serviceCenter = useLoaderData(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedDistrict, setMatchedDistrict] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    const match = serviceCenter.find((d) =>
      d.district.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    if (match) {
      setMatchedDistrict(match);
    } else {
      setMessage("District not found!");
    }
  };

  return (
    <div className="py-10 px-4 md:px-10 lg:px-20 bg-white rounded-2xl min-h-screen">
      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-extrabold text-secondary mb-6">
        We are available in 64 districts
      </h2>

      {/* Search Bar */}
      <div className=" mb-12">
        <div className="flex relative w-full sm:w-[400px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>

          
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full rounded-full pl-10 pr-24 py-2 border border-gray-300 focus:outline-none focus:ring-2"
          />

          
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0 bg-primary px-6 font-semibold rounded-full hover:bg-primary transition"
          >
            Search
          </button>
        </div>
        {
        message && 
        <p className="text-red-500 mt-2">{message}</p>
      }
      </div>
      

      {/* Subtitle */}
      <h3 className="text-xl md:text-3xl font-extrabold text-secondary mb-4">
        We deliver almost all over Bangladesh
      </h3>

      {/* Map */}
      <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={[23.685, 90.3563]} 
          zoom={7}
          scrollWheelZoom={true}
          className="h-[500px] w-full"
        >
          {/* Trigger movement when matched */}
          <MapController searchTarget={matchedDistrict} />

          {/* Base map layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />

          {/* Markers for all districts */}
          {serviceCenter.map((district, index) => (
            <Marker
              key={index}
              position={[district.latitude, district.longitude]}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{district.district}</strong> <br />
                  Region: {district.region} <br />
                  City: {district.city} <br />
                  Covered: {district.covered_area.join(", ")} <br />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Coverage;
