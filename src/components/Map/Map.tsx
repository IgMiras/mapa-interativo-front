import { MapContainer, TileLayer } from 'react-leaflet';
import tileLayer from '../../util/tileLayer';
import 'leaflet/dist/leaflet.css';
import { LatLngBoundsExpression } from 'leaflet';

const center: [number, number] = [-22.1212, -51.3834];

const bounds: LatLngBoundsExpression = [
  [-22.172, -51.468], // Sudoeste de Presidente Prudente
  [-22.066, -51.349], // Nordeste de Presidente Prudente
];

const MapWrapper = () => {
  return (
    <MapContainer 
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer {...tileLayer}/>
    </MapContainer>
  )
}

export default MapWrapper;