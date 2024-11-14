import { useState } from 'react';
import Modal from 'react-modal';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L, { LatLngBoundsExpression } from 'leaflet';
import { Occurrence, OccurrenceType, occurrenceTypeLabels } from '../../types';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import tileLayer from '../../util/tileLayer';

import constructionIcon from '../../assets/icons/construction-svgrepo-com.svg';
import fireIcon from '../../assets/icons/fire-svgrepo-com.svg';
import noWaterIcon from '../../assets/icons/no-liquids-svgrepo-com.svg';
import noPowerIcon from '../../assets/icons/no-power-icon.svg';
import protestIcon from '../../assets/icons/protest-loudspeaker-svgrepo-com.svg';
import accidentIcon from '../../assets/icons/reflective-triangle-accident-svgrepo-com.svg';
import theftIcon from '../../assets/icons/theft.svg';
import policeCheckpointIcon from '../../assets/icons/police-checkpoint.svg';
import { modalStyles } from '../Modal/styles';
import { createOccurrence } from '../../services/api';

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

const ClickHandler: React.FC<{
    setCoordinates: React.Dispatch<
        React.SetStateAction<{ lat: number; lng: number } | null>
    >;
}> = ({ setCoordinates }) => {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            setCoordinates({ lat, lng });
        },
    });

    return null;
};

const MapWrapper: React.FC<MapComponentProps> = ({ occurrences }) => {
    const [coordinates, setCoordinates] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [occurrenceType, setOccurrenceType] = useState<OccurrenceType | null>(
        null
    );
    const [description, setDescription] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleConfirm = async () => {
        console.log('handleConfirm');
        if (coordinates && occurrenceType && description) {
            console.log('Coordinates:', coordinates);
            console.log('Occurrence Type:', occurrenceType);
            console.log('Description:', description);

            try {
                const response = await createOccurrence({
                    type: occurrenceType,
                    coordinates,
                    description,
                });

                if (response.status === 201) {
                    setFeedbackMessage('Ocorrência criada com sucesso');
                    setCoordinates(null);
                    setOccurrenceType(null);
                    setDescription('');
                } else {
                    setFeedbackMessage('Erro ao criar ocorrência');
                }
            } catch (error) {
                setFeedbackMessage('Erro ao criar ocorrência');
                console.error('Catch - Erro ao enviar ocorrência:', error);
            }
        }
    };

    return (
        <>
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
                style={{ height: '100%', width: '80vw' }}
            >
                <TileLayer {...tileLayer} />
                <ClickHandler
                    setCoordinates={(coords) => {
                        setCoordinates(coords);
                        openModal();
                    }}
                />
                <MarkerClusterGroup>
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
                                    <strong>Tipo:</strong> {occurrence.type}{' '}
                                    <br />
                                    <strong>Descricao:</strong>{' '}
                                    {occurrence.description} <br />
                                    <strong>Coordenadas:</strong>
                                    {occurrence.coordinates.lat},{' '}
                                    {occurrence.coordinates.lng}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Reportar Ocorrência"
                style={modalStyles}
            >
                <h2 style={{ textAlign: 'center', color: '#333' }}>
                    Adicionar Ocorrência
                </h2>

                <div style={{ marginBottom: '10px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: 'black',
                        }}
                    >
                        Tipo:
                    </label>
                    <select
                        value={occurrenceType || ''}
                        onChange={(e) =>
                            setOccurrenceType(e.target.value as OccurrenceType)
                        }
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '15px',
                        }}
                    >
                        <option value="" disabled>
                            Selecione um tipo
                        </option>
                        {Object.entries(occurrenceTypeLabels).map(
                            ([type, label]) => (
                                <option key={type} value={type}>
                                    {label}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            color: 'black',
                        }}
                    >
                        Descrição:
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            resize: 'vertical',
                            minHeight: '60px',
                            marginBottom: '15px',
                        }}
                    />
                </div>

                {feedbackMessage && (
                    <p
                        style={{
                            color: feedbackMessage.includes('Erro')
                                ? 'red'
                                : 'green',
                            textAlign: 'center',
                            fontSize: '14px',
                            marginBottom: '15px',
                        }}
                    >
                        {feedbackMessage}
                    </p>
                )}

                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <button
                        onClick={handleConfirm}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '4px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={closeModal}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '4px',
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default MapWrapper;
