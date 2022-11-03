const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    let errObj = {};
    validationErrors
      .array()
      .forEach((error) => (errObj[error.param] = error.msg));

    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: errObj,
    });
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
