const errorHandler = (err, _req, res, _next) => {
  console.log(err)
  // const errStatus = err.status || 500;
  const errMsg = err.message || "Internal Server Error958958";
  res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
    success: false,
    stack: err.stack,
  });
};

module.exports = errorHandler;
