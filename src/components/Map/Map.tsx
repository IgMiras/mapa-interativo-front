import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import tileLayer from '../../util/tileLayer';
import 'leaflet/dist/leaflet.css';
import L, { LatLngBoundsExpression } from 'leaflet';
import { Occurrence, OccurrenceType } from '../../types';
import constructionIcon from '../../assets/icons/construction-svgrepo-com.svg';
import fireIcon from '../../assets/icons/fire-svgrepo-com.svg';
import noWaterIcon from '../../assets/icons/no-liquids-svgrepo-com.svg';
import noPowerIcon from '../../assets/icons/no-power-icon.svg';
import protestIcon from '../../assets/icons/protest-loudspeaker-svgrepo-com.svg';
import accidentIcon from '../../assets/icons/reflective-triangle-accident-svgrepo-cm.svg';
import theftIcon from '../../assets/icons/theft.svg';
import policeCheckpointIcon from '../../assets/icons/police-checkpoint.svg';

const center: [number, number] = [-22.1212, -51.3834];

const bounds: LatLngBoundsExpression = [
    [-22.172, -51.468], // Sudoeste de Presidente Prudente
    [-22.066, -51.349], // Nordeste de Presidente Prudente
];

interface MapComponentProps {
    occurrences: Occurrence[];
}

const getIconForOccurrenceType = (type: OccurrenceType) => {
    switch (type) {
        case OccurrenceType.CONSTRUCTION:
            return L.icon({
                iconUrl: constructionIcon,
                iconSize: [30, 30], // Tamanho do ícone
                iconAnchor: [15, 30], // Posição do ancla do ícone
                popupAnchor: [0, -30], // Posição do popup
            });
        case OccurrenceType.FIRE:
            return L.icon({
                iconUrl: fireIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });
        case OccurrenceType.NOWATER:
            return L.icon({
                iconUrl: noWaterIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });
        case OccurrenceType.NOPOWER:
            return L.icon({
                iconUrl: noPowerIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });
        case OccurrenceType.PROTEST:
            return L.icon({
                iconUrl: protestIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });
        case OccurrenceType.ACCIDENT:
            return L.icon({
                iconUrl: accidentIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });
        case OccurrenceType.THEFT:
            return L.icon({
                iconUrl: theftIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });
        case OccurrenceType.CHECKPOINT:
            return L.icon({
                iconUrl: policeCheckpointIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });

        default:
            console.log('tipo não reconhecido', type);
            return L.icon({
                iconUrl: accidentIcon, // Ícone padrão caso o tipo não seja reconhecido
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });
    }
};

const MapWrapper: React.FC<MapComponentProps> = ({ occurrences }) => {
    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={false}
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
        >
            <TileLayer {...tileLayer} />
            {occurrences.map((occurrence) => (
                <Marker
                    key={occurrence.id}
                    position={[
                        occurrence.coordinates.lat,
                        occurrence.coordinates.lng,
                    ]}
                    icon={getIconForOccurrenceType(occurrence.type)}
                >
                    <Popup>
                        <div>
                            <strong>Tipo:</strong> {occurrence.type} <br />
                            <strong>Coordenadas:</strong>{' '}
                            {occurrence.coordinates.lat},{' '}
                            {occurrence.coordinates.lng}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapWrapper;
