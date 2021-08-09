import React, { FunctionComponent, useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import MarkerIcon from 'assets/svg/leaflet_marker_icon.svg';
import MarkerIconActive from 'assets/svg/leaflet_marker_icon_active.svg';
import Leaflet, { LatLngTuple } from 'leaflet';
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

type Props = {
  initialCenter?: { lat: string; lng: string };
  results: any;
};

const ImmersionMapView: FunctionComponent<Props> = ({ initialCenter, results }) => {
  const [center, setCenter] = useState<LatLngTuple>([
    Number.parseFloat(initialCenter?.lat || '0'),
    Number.parseFloat(initialCenter?.lng || '0'),
  ]);
  const [zoom, setZoom] = useState(14);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  useEffect(() => {
    if (selectedCompany) setCenter([selectedCompany.location.lat, selectedCompany.location.lng]);
  }, [selectedCompany]);

  return (
    <div className="relative flex-1 flex-grow flex">
      <div className="z-10 absolute bottom-0 left-0 right-0 md:left-auto md:bottom-auto md:right-2 md:top-2">
        {selectedCompany && <ImmersionMarkerPopup result={selectedCompany} />}
      </div>
      <Map center={center} zoom={zoom} onzoomend={(e) => setZoom(e.target.getZoom())}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />
        {results &&
          results.map((v: any) => (
            <Marker
              key={v.key}
              position={[v.location.lat, v.location.lng]}
              icon={v.key === selectedCompany?.key ? iconMarkerActive : iconMarker}
              onclick={() => setSelectedCompany(v)}
            />
          ))}
      </Map>
    </div>
  );
};

export default ImmersionMapView;
