export type Coordinate = {
  lat: number;
  lon: number;
};

export type Beach = {
  id: string;
  name: string;
  area: string;
  facilityId: string;
  timestamp: string;
  handicapAccesible: boolean;
  coordinate?: Coordinate;
  managedBy?: string;
};
