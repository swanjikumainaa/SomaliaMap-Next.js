import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import { IoLocationSharp } from 'react-icons/io5';
import { renderToString } from 'react-dom/server';

interface Location {
  region: string;
  latitude: number;
  longitude: number;
  immunizationRate: number;
}

const Map = () => {
  useEffect(() => {
    const locations: Location[] = [
      {
        region: 'Jubaland',
        latitude: 6.85,
        longitude: 47.65,
        immunizationRate: 5,
      },
      {
        region: 'Somaliland',
        latitude: 6.23,
        longitude: 48.10,
        immunizationRate: 20,
      },
    ];

    const bounds = L.latLngBounds(L.latLng(0, 40), L.latLng(12, 52));

    const map = L.map('map', {
      maxBounds: bounds,
      minZoom: 6,
    }).fitBounds(bounds);

    const somaliaTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      subdomains: ['a', 'b', 'c'],
      bounds: bounds,
      maxZoom: 6,
      minZoom: 0,
    }).addTo(map);

    locations.forEach((location) => {
      const svgString = renderToString(<IoLocationSharp size={24} className="text-red-500" />);
      const locationIcon = new Icon({
        iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        
      });

      const marker = L.marker([location.latitude, location.longitude], { icon: locationIcon }).addTo(map);

      marker.bindPopup(`<b>${location.region}</b><br>Immunization Rate: ${location.immunizationRate}%`);
    });
  }, []);

  return <div id="map" className="flex justify-center items-center h-screen bg-white w-1/2 ml-50 mt-50"/>;
};

export default Map;
