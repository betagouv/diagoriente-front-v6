import React, { FunctionComponent } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ImmersionMapView: FunctionComponent = () => {
  return (
    <div className="flex-1 flex-grow flex">
      <Map center={[48.8584, 2.2945]} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} />
      </Map>
    </div>
  );
};

export default ImmersionMapView;
