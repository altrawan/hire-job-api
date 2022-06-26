const validUrl = require('valid-url');
const { failed } = require('../helpers/response');

module.exports = (req, res, next) => {
  try {
    const extractedErrors = [];

    if (req.body.instagram) {
      if (!validUrl.isUri(req.body.instagram)) {
        extractedErrors.push({
          msg: 'Instagram url is not valid',
          param: 'instagram',
          location: 'body',
        });
      }
    }

    if (req.body.linkedin) {
      if (!validUrl.isUri(req.body.linkedin)) {
        extractedErrors.push({
          msg: 'Linkedin url is not valid',
          param: 'linkedin',
          location: 'body',
        });
      }
    }

    if (req.body.github) {
      if (!validUrl.isUri(req.body.github)) {
        extractedErrors.push({
          msg: 'Github url is not valid',
          param: 'github',
          location: 'body',
        });
      }
    }

    if (req.body.gitlab) {
      if (!validUrl.isUri(req.body.gitlab)) {
        extractedErrors.push({
          msg: 'Gitlab url is not valid',
          param: 'gitlab',
          location: 'body',
        });
      }
    }

    if (error.length) {
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
