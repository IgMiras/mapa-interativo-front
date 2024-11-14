export interface Coordinates {
    lat: number;
    lng: number;
}

export enum OccurrenceType {
    CONSTRUCTION = 'construction',
    ACCIDENT = 'accident',
    CHECKPOINT = 'checkpoint',
    FIRE = 'fire',
    PROTEST = 'protest',
    NOWATER = 'nowater',
    NOPOWER = 'nopower',
    THEFT = 'theft',
}

export const occurrenceTypeLabels: Record<OccurrenceType, string> = {
    [OccurrenceType.CONSTRUCTION]: 'Obras',
    [OccurrenceType.ACCIDENT]: 'Acidente',
    [OccurrenceType.CHECKPOINT]: 'Blitz',
    [OccurrenceType.FIRE]: 'Incêndio',
    [OccurrenceType.PROTEST]: 'Manifestações',
    [OccurrenceType.NOWATER]: 'Sem água',
    [OccurrenceType.NOPOWER]: 'Sem energia',
    [OccurrenceType.THEFT]: 'Roubo',
};

export interface Occurrence {
    id?: number;
    type: OccurrenceType;
    coordinates: Coordinates;
    description: string;
}
