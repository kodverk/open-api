export class TypedFetchError extends Error {
  status: number;
  constructor(message: string, status?: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message ?? "Something went wrong, please try again";
    this.status = status ?? 500;
  }
}

// NOTE: we can add better error handling when we have figured out how
// umea public beaches api handles errors
