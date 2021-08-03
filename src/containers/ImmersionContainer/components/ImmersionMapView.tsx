import React, { FunctionComponent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import MarkerIcon from 'assets/svg/leaflet_marker_icon.svg';
import MarkerIconActive from 'assets/svg/leaflet_marker_icon_active.svg';
import Leaflet from 'leaflet';
import ImmersionMarkerPopup from './ImmersionMarkerPopup';
import 'leaflet/dist/leaflet.css';

const iconMarker = new Leaflet.Icon({
  iconUrl: MarkerIcon,
  iconRetinaUrl: MarkerIcon,
  iconSize: new Leaflet.Point(18, 29),
});

const iconMarkerActive = new Leaflet.Icon({
  iconUrl: MarkerIconActive,
  iconRetinaUrl: MarkerIconActive,
  iconSize: new Leaflet.Point(18, 29),
});

const ImmersionMapView: FunctionComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative flex-1 flex-grow flex">
      <div className="z-10 absolute bottom-0 md:bottom-auto md:right-2 md:top-2">
        {showPopup && <ImmersionMarkerPopup />}
      </div>
      <Map center={[48.8584, 2.2945]} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />
        <Marker position={[48.8584, 2.2945]} icon={iconMarker} onclick={() => setShowPopup(true)} />
      </Map>
    </div>
  );
};

export default ImmersionMapView;
