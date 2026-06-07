const errorHandler = (err, req, res, next) => {
  // 1. Log the full stack trace to your terminal for fast debugging
  console.error("🚨 [Application Error]:", err.stack || err);

  // 2. Safely capture status codes from internal custom errors or downstream Axios requests
  const statusCode = err.response?.status || err.statusCode || 500;

  // 3. Extract the cleanest error message string available
  const errorMessage = err.response?.data?.message || err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: errorMessage // Kept as 'error' for endpoint uniformity
  });
};

module.exports = errorHandler;
