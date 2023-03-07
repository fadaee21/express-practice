const errorHandlerMiddleware = (err, _req, res, _next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    //  stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    stack: err.stack,
  });
};

module.exports = errorHandlerMiddleware;
