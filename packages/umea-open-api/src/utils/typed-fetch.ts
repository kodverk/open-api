export async function typedFetch<T extends unknown>(input: RequestInfo | URL, init?: RequestInit | undefined) {
  const response = await fetch(input, init)
  return response.json() as Promise<T>
}