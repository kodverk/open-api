import { TypedFetchError } from "./custom-errors";

export async function typedFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new TypedFetchError(
      `Failed to fetch ${input.toString()}`,
      response.status,
    );
  }
  return response.json() as Promise<T>;
}
