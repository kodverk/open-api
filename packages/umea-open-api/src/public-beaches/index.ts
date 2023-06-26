import { typedFetch } from "../utils/typed-fetch";
import type { PublicBeachesIncomingResponse, Record } from "./types/incoming-response";
import type { Beach } from "./types/outgoing-response"

const baseUrl = "https://opendata.umea.se/api/records/1.0/search"

type BeachProximityFilter = {
    coordinate: {
      lat: number
      lon: number
    }
    distance: number
}

export type FetchPublicBeachesOptions = {
  searchQuery?: string
  rows?: number
  beachProximityFilter?: BeachProximityFilter
}

const translateProximityFilterToParam = ({coordinate: {lat, lon}, distance}: BeachProximityFilter) => [lat, lon, distance].join(",")

export function fetchPublicBeaches(options: FetchPublicBeachesOptions) {
  const {searchQuery, beachProximityFilter, rows} = options
  const params = new URLSearchParams({dataset: "badplatser"})
  if(searchQuery) params.append("q", searchQuery)
  if(rows) params.append("rows", rows.toString())
  if(beachProximityFilter) params.append("geofilter.distance", translateProximityFilterToParam(beachProximityFilter))
  console.log({url:`${baseUrl}?${params}`})
  return typedFetch<PublicBeachesIncomingResponse>(`${baseUrl}?${params}`)
}

export function recordToBeach(beach: Record) {
  return {
    id: beach.recordid,
    name: beach.fields.namn,
    area: beach.fields.omrade,
    facilityId: beach.fields.anlaggn_id,
    timestamp: beach.record_timestamp,
    geometry: beach.geometry,
    handicapAccesible: !!beach.fields?.handik_anp,
    managedBy: beach.fields?.huvudansva ?? null,
  } satisfies Beach
}