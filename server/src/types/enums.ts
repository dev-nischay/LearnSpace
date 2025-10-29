export enum Source {
  body = "body",
  params = "params",
  query = "query",
}

export enum targetMap {
  body = "validatedBody",
  params = "validatedParams",
  query = "validatedQuery",
}

export enum HttpStatus {
  NotFound = 404,
  Forbidden = 409,
  InternalServerError = 500,
  Ok = 200,
  Unauthorized = 401,
  BadRequest = 400,
}
