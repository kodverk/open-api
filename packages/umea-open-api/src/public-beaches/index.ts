import { typedFetch } from "../utils/typed-fetch";
import type {
  BeachRecord,
  PublicBeachesIncomingResponse,
} from "./types/incoming-response";
import type { Beach, Coordinate } from "./types/outgoing-response";

const baseUrl = "https://opendata.umea.se/api/records/1.0/search";

type BeachProximityFilter = {
  coordinate: Coordinate;
  distance: number;
};

export type FetchPublicBeachesOptions = {
  searchQuery?: string;
  rows?: number;
  beachProximityFilter?: BeachProximityFilter;
};

const translateProximityFilterToParam = ({
  coordinate: { lat, lon },
  distance,
}: BeachProximityFilter) => [lat, lon, distance].join(",");

export function fetchPublicBeaches(options: FetchPublicBeachesOptions) {
  const { searchQuery, beachProximityFilter, rows } = options;
  const params = new URLSearchParams({ dataset: "badplatser" });
  if (searchQuery) params.append("q", searchQuery);
  if (rows) params.append("rows", rows.toString());
  if (beachProximityFilter)
    params.append(
      "geofilter.distance",
      translateProximityFilterToParam(beachProximityFilter),
    );
  return typedFetch<PublicBeachesIncomingResponse>(
    `${baseUrl}?${params.toString()}`,
  );
}

export function recordToBeach(beach: BeachRecord) {
  const [lat, lon] = beach.geometry.coordinates;
  return {
    id: beach.recordid,
    name: beach.fields.namn,
    area: beach.fields.omrade,
    facilityId: beach.fields.anlaggn_id,
    timestamp: beach.record_timestamp,
    coordinate: lat && lon ? { lat, lon } : undefined,
    handicapAccesible: !!beach.fields?.handik_anp,
    managedBy: beach.fields?.huvudansva,
  } satisfies Beach;
}
