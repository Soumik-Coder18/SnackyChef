import React, { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import areaCoords from "./areaCoords.json";

// Using a proper TopoJSON world map with country details
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapView = ({ onSelectArea, selectedArea }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleZoomIn = useCallback(() => {
    setPosition(pos => ({
      ...pos,
      zoom: Math.min(pos.zoom * 1.5, 3)
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setPosition(pos => ({
      ...pos,
      zoom: Math.max(pos.zoom / 1.5, 0.8)
    }));
  }, []);

  const handleMoveEnd = useCallback((pos) => {
    setPosition(pos);
  }, []);

  const handleMarkerClick = (area) => {
    onSelectArea(area);
    window.scrollTo({ top: window.scrollY + 600, behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border-2 border-[#FFD6A5] bg-[#FFF7ED] relative">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#5C2C1E] hover:bg-[#FF7F50] hover:text-white transition-colors"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#5C2C1E] hover:bg-[#FF7F50] hover:text-white transition-colors"
        >
          -
        </button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          rotate: [0, 0, 0],
          center: [0, 20]
        }}
        width={800}
        height={450}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          minZoom={0.8}
          maxZoom={3}
        >
          {/* Realistic Map Background */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAE2D8"
                  stroke="#D4C9B8"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { 
                      fill: "#D8C9B5",
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: { 
                      fill: "#C9B9A2",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>

          {/* Your Location Markers */}
          {Object.entries(areaCoords)
            .filter(([area, coords]) => {
              const valid = Array.isArray(coords) &&
                coords.length === 2 &&
                coords.every(c => typeof c === "number" && !isNaN(c));
              if (!valid) {
                console.warn(`Invalid coordinates for area "${area}":`, coords);
              }
              return valid;
            })
            .map(([area, coords]) => {
              const [lon, lat] = coords;
              const isSelected = selectedArea === area;
              
              return (
                <Marker
                  key={area}
                  coordinates={[lon, lat]}
                  onClick={() => handleMarkerClick(area)}
                >
                  <g className="transition-all duration-300 hover:scale-125">
                    <circle
                      r={isSelected ? 8 : 6}
                      fill={isSelected ? "#FF7F50" : "#E07A5F"}
                      stroke="#FFF7ED"
                      strokeWidth={isSelected ? 2.5 : 2}
                      className="cursor-pointer drop-shadow-md"
                    />
                    {isSelected && (
                      <circle
                        r={12}
                        fill="transparent"
                        stroke="#FF7F50"
                        strokeWidth={1.5}
                        strokeOpacity={0.5}
                        className="animate-ping"
                      />
                    )}
                    <text
                      textAnchor="middle"
                      y={isSelected ? -18 : -12}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fill: isSelected ? "#5C2C1E" : "#7B4B2A",
                        fontSize: isSelected ? "0.8rem" : "0.7rem",
                        fontWeight: isSelected ? "700" : "600",
                        pointerEvents: "none",
                        textShadow: "1px 1px 2px rgba(255, 247, 237, 0.8)"
                      }}
                      className="transition-all duration-300"
                    >
                      {area}
                    </text>
                  </g>
                </Marker>
              );
            })}
        </ZoomableGroup>
      </ComposableMap>

      <div className="p-3 bg-gradient-to-r from-[#FF7F50] to-[#E07A5F]">
        <p className="text-sm text-white font-medium text-center">
          {selectedArea 
            ? `📍 Selected Location: ${selectedArea} (Zoom: ${position.zoom.toFixed(1)}x)`
            : "🔍 Click on any marker to select a location"}
        </p>
      </div>
    </div>
  );
};

export default MapView;