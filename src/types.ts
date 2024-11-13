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

export interface Occurrence {
    id?: number;
    type: OccurrenceType;
    coordinates: Coordinates;
}
