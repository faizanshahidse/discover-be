/** Third party dependencies */
const { validationResult } = require("express-validator");



const apiFailedResponse = (
  message,
  data,
  error_messages,
  statusCode = 500,
  stack
) => {
  return {
    response: false,
    status_code: statusCode,
    message: message,
    error_msgs: error_messages,
    data: data,
    status: `${statusCode}`.startsWith("4") ? "fail" : "error",
    isOperational: true,
    stack: stack,
  };
}


const apiSuccessResponse = (message, data, error_messages = {}) => {
  return {
    response: true,
    status_code: 200,
    message: message,
    error_msgs: error_messages,
    data: data,
  };
}


const ucwords = (str) => {
  return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
}


const checkValidation = (req) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  if (!errors.isEmpty()) {
    let validationErrors = [];
    errors
      .array({
        onlyFirstError: true,
      })
      .forEach((error, i) => {
        validationErrors[i] = error.msg;
      });
    return {
      success: false,
      message: "Validation errors",
      errors: validationErrors,
      error_code: 400,
      data: [],
    };
  } else {
    return { success: true };
  }
}


const randomString = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


module.exports = {
  apiFailedResponse,
  randomString,
  checkValidation,
  apiSuccessResponse,
  ucwords,
};
