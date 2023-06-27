import { fetchPublicBeaches, recordToBeach, type FetchPublicBeachesOptions} from "./public-beaches"

export class UmeaOpenAPI {
  constructor() {}

  public async getPublicBeaches(options: FetchPublicBeachesOptions | void) {
    const res = await fetchPublicBeaches(options ?? {rows: 10})
    return res.records.map(recordToBeach)
  }
}