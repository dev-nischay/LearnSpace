export const errorHandler = (err, req, res, nex) => {
  let statusCode = err.statusCode || 500;

  if (err.isOperational) {
    res.status(statusCode).json({
      success: false,
      error: err.message,
    });
  }

  console.error("Unexpected Error", err);

  res.status(statusCode).json({
    success: false,
    error: `Something went wrong: ${err.message}`,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // look later
  });
};
