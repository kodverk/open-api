import { Geometry } from "./incoming-response"

export type Beach = {
    id: string
    name: string
    area: string
    facilityId: string
    timestamp: string
    geometry: Geometry
    handicapAccesible: boolean 
    managedBy: string | null
}