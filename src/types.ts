export interface Coordinates {
    lat: number;
    lng: number;
  }
  
export interface Occurrence {
    id?: number;
    type: string;
    coordinates: Coordinates;
  }



  