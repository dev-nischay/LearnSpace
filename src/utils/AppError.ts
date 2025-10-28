class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public isOperational: boolean = true
  ) {
    super(message), Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
