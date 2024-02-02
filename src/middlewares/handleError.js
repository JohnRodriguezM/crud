const handleError = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;

  const response = {
    status: "error",
    message: err.message || "Internal Server Error, please try again.",
    data: null,
    errorName: err.name || null,
    parameters: req.params || null,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export {
  handleError,
}
