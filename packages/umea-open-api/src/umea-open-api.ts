import {
  fetchPublicBeaches,
  recordToBeach,
  type FetchPublicBeachesOptions,
} from "./public-beaches";

export class UmeaOpenAPI {
  public publicBeaches = {
    async get(options?: FetchPublicBeachesOptions) {
      const res = await fetchPublicBeaches(options ?? { rows: 10 });
      return res.records.map(recordToBeach);
    },
  };
}
