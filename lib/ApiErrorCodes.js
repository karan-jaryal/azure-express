/**
 * Defined API errors.
 */
module.exports = {
  'INVALID_INPUT': {
    status: 400,
    message: 'Invalid input in request'
  },
  'NOT_FOUND': {
    status: 404,
    message: 'No such resource exists'
  },
  'NOT_ALLOWED': {
    status: 403,
    message: 'Operation not allowed'
  },
  'NO_ACCESS': {
    status: 403,
    message: 'Access not allowed'
  },
  'ALREADY_EXISTS': {
    status: 409,
    message: 'Resource already exists'
  },
  'SIZE_LIMIT': {
    status: 413,
    message: 'Input size exceeds allowed limits'
  },
  'RATE_LIMIT': {
    status: 429,
    message: 'Request rate exceeds allowed limits'
  },
  'INVALID_DOSSIER': {
    status: 403,
    message: 'Invalid Dossier'
  },
  'INVALID_LOGIN': {
    status: 403,
    message: 'Invalid Login'
  },
  INTERNAL: {
    status: 500,
    message: "Internal server error."
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Unauthorized access."
  },
  NOT_IMPLEMENTED: {
    status: 501,
    message: "Resource method not implemented."
  },
  INVALID_INPUT_FORMAT: {
    status: 400,
    message: "Invalid input in format."
  },
  INPUT_TOO_LARGE: {    
    status: 413,
    message: "Input too large."
  },
  INVALID_KEY: {
    status: 401,
    message:
      "Valid api key is required. Please provide a valid api key along with request."
  },
  INVALID_MIME_TYPE: {
    status: 400,
    message: "File type you are uploading not allowed with this request."
  },
  PARSING_ERROR: {
    status: 403,
    message: "File parsing error."
  },
  CYCLE_FOUND: {
    status: 405,
    message: "Cycle Found."
  },
  USER_DISABLED: {
    status: 406,
    message: "User Disabled."
  },
  INVALID_VERIFICATION_CODE: {
    status: 400,
    message: "Invalid verification code."
  }
};
