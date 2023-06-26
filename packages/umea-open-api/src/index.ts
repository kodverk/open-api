import { fetchPublicBeaches, recordToBeach, type FetchPublicBeachesOptions} from "./public-beaches"

export class UmeaOpenAPI {
  constructor() {}

  public async getPublicBeaches(options: FetchPublicBeachesOptions | void) {
    const res = await fetchPublicBeaches(options ?? {rows: 10})
    return res.records.map(recordToBeach)
  }
}

async function main() {
  const api = new UmeaOpenAPI()
  const res = await api.getPublicBeaches({
    beachProximityFilter: {
      coordinate: {
        lat: 63.84423982962995,
        lon: 20.280075615518985 
      },
      distance: 5000,
    }
  })
  console.log(res)
}

main()