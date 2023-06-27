export interface PublicBeachesIncomingResponse {
  nhits: number;
  parameters: Parameters;
  records: BeachRecord[];
  facet_groups: FacetGroup[];
}

export interface Parameters {
  dataset: string;
  rows: number;
  start: number;
  facet: string[];
  format: string;
  timezone: string;
}

export interface BeachRecord {
  datasetid: string;
  recordid: string;
  fields: Fields;
  geometry: Geometry;
  record_timestamp: string;
}

export interface Fields {
  namn: string;
  geo_point_2d: number[];
  anlaggn_id: string;
  omrade: string;
  handik_anp?: string;
  typ: string;
  huvudansva?: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface FacetGroup {
  name: string;
  facets: Facet[];
}

export interface Facet {
  name: string;
  count: number;
  state: string;
  path: string;
}
