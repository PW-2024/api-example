function NotFoundError(message) {
  const error = new Error(message || "Resource not found");
  error.statusCode = 404;

  return error;
}

function ValidationError(errors, message) {
  const error = new Error(message || "Validation error");
  error.statusCode = 422;
  error.errors = errors;

  return error;
}

module.exports = {
  NotFoundError,
  ValidationError,
};
