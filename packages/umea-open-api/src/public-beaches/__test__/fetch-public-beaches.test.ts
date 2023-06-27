import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { fetchPublicBeaches, recordToBeach } from "../../public-beaches";
import {
  BeachRecord,
  PublicBeachesIncomingResponse,
} from "../types/incoming-response";

const createFetchOKResponse = <T>(data: T) => ({
  ok: true,
  json: () => new Promise((resolve) => resolve(data)),
});

const createFetchErrorResponse = (error: {
  status: number;
  message?: string;
}) => ({
  ok: false,
  ...error,
});

global.fetch = vi.fn();

describe("[UMEA-API]: Public beaches", () => {
  describe("fetchPublicBeaches", () => {
    beforeEach(() => {
      (fetch as Mock).mockReset();
    });
    it("should return a list of beaches", async () => {
      const mockedResponse = genIncomingBeachResponse();
      (fetch as Mock).mockReturnValueOnce(
        createFetchOKResponse(mockedResponse),
      );
      const res = await fetchPublicBeaches({});
      expect(res).toEqual(mockedResponse);
    });
    it("should throw an error if the response is not ok", async () => {
      (fetch as Mock).mockReturnValueOnce(
        createFetchErrorResponse({ status: 500 }),
      );
      await expect(fetchPublicBeaches({})).rejects.toThrowError();
    });
  });
  describe("recordToBeach", () => {
    it("should return a beach", () => {
      const mockedRecord = genBeachRecord();
      const res = recordToBeach(mockedRecord);
      expect(res).toEqual({
        id: mockedRecord.recordid,
        name: mockedRecord.fields.namn,
        area: mockedRecord.fields.omrade,
        facilityId: mockedRecord.fields.anlaggn_id,
        timestamp: mockedRecord.record_timestamp,
        coordinate: {
          lat: mockedRecord.geometry.coordinates[0],
          lon: mockedRecord.geometry.coordinates[1],
        },
        handicapAccesible: !!mockedRecord.fields?.handik_anp,
        managedBy: mockedRecord.fields?.huvudansva,
      });
    });
  });
});

const genIncomingBeachResponse = (): PublicBeachesIncomingResponse => {
  const beaches = Array.from({ length: 10 }, () => genBeachRecord());
  return {
    records: beaches,
    nhits: beaches.length,
    facet_groups: [{ name: "test", facets: [] }],
    parameters: {
      dataset: "public-beaches",
      rows: 10,
      start: 0,
      facet: [],
      format: "json",
      timezone: "UTC",
    },
  };
};

const genBeachRecord = () =>
  ({
    datasetid: faker.string.uuid(),
    recordid: faker.string.uuid(),
    fields: {
      namn: faker.person.zodiacSign(),
      geo_point_2d: [faker.location.latitude(), faker.location.longitude()],
      anlaggn_id: faker.string.uuid(),
      omrade: faker.location.city(),
      handik_anp: faker.helpers.arrayElement(["Ja", "Nej"]),
      typ: faker.helpers.arrayElement(["Badplats", "Badplats med brygga"]),
      huvudansva: faker.company.name(),
    },
    geometry: {
      type: "Point",
      coordinates: [faker.location.latitude(), faker.location.longitude()],
    },
    record_timestamp: faker.date.recent().toISOString(),
  } satisfies BeachRecord);
