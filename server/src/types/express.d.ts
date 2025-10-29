declare namespace Express {
  export interface Request {
    token: {
      id: string;
      role?: string;
    };
    validatedBody: unknown;
    validatedParams: {
      id?: string;
    };
    validatedQuery: unknown;
  }
}
