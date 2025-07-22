const errorHandler = (error, req, res, next) => {
  console.error(error);

  // Sequelize validation errors
  if (error.name === "SequelizeValidationError") {
    const errors = error.errors.map((err) => ({
      field: err.path,
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors,
    });
  }

  // Sequelize unique constraint errors
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      success: false,
      message: "Resource already exists",
      field: error.errors[0]?.path,
    });
  }

  // Custom application errors
  if (error.message) {
    const statusCode = error.message.includes("not found")
      ? 404
      : error.message.includes("Unauthorized")
      ? 403
      : error.message.includes("Invalid credentials")
      ? 401
      : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = errorHandler;
