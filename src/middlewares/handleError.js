const handleError = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;

  const response = {
    status: "error",
    success: false,
    message: err.message || "Internal Server Error, please try again.",
    errorName: err.name || "Error, please try again",
    parameters: req.params || "No parameters",
  };

  if (err.name === "ValidationError") {
    response.message =
      "Invalid input data. Please verify your data and try again.";
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
    response.errorDetails = err;
  }

  res.status(statusCode).json(response);
};

export { handleError };
