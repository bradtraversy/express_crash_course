const AppError = require('./AppError');

class ValidationError extends AppError {
  constructor(message = "Invalid request data") {
    super(message, 400);
  }
}

module.exports = ValidationError;