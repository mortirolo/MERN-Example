// These functions run if there is an error during a request
// arg err over-rides built-in express error-handler
// arg next calls any possible further middleware
const errorHandler = (err, req, res, next) => {
  // If controller catches error, display its error code, else display server error, 500
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)

  res.json({
    message: err.message,  // Print error msg from controller
    // Print stack if we are in dev mode, but not production mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

module.exports = {
  errorHandler,
}