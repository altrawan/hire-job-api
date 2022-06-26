const validUrl = require('valid-url');
const { failed } = require('../helpers/response');

module.exports = (req, res, next) => {
  try {
    const extractedErrors = [];

    if (req.body.instagram) {
      if (!validUrl.isUri(req.body.instagram)) {
        extractedErrors.push('Instagram url is not valid');
      }
    }

    if (req.body.linkedin) {
      if (!validUrl.isUri(req.body.linkedin)) {
        extractedErrors.push('Linkedin url is not valid');
      }
    }

    if (req.body.github) {
      if (!validUrl.isUri(req.body.github)) {
        extractedErrors.push('Github url is not valid');
      }
    }

    if (req.body.gitlab) {
      if (!validUrl.isUri(req.body.gitlab)) {
        extractedErrors.push('Gitlab url is not valid');
      }
    }

    if (extractedErrors.length) {
      return failed(res, {
        code: 422,
        message: 'Validation Failed',
        error: extractedErrors,
      });
    }

    next();
  } catch (error) {
    return failed(res, {
      code: 500,
      message: error.message,
      error: 'Internal Server Error',
    });
  }
};
