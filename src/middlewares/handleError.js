function handleError(err, req, res, next) {
  console.error(err.stack);

  // Use the status code from the error if it has one, otherwise default to 500
  const statusCode = err.statusCode || 500;

  // Create a response object
  const response = {
    status: "error",
    message: err.message || "Internal Server Error, please try again.",
    data: null,
    errorName: err.name || null,
    parameters: req.params || null,
  };

  // In a development environment, include the stack trace in the response
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  // Send the response
  res.status(statusCode).json(response);
}
