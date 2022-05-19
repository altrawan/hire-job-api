const { getUserByEmail } = require('../models/auth.model');
const { failed } = require('../helpers/response');

module.exports = {
  isVerified: async (req, res, next) => {
    try {
      const user = await getUserByEmail(req.body.email);

      if (!user.rowCount) {
        next();
      } else if (user.rows[0].is_verified) {
        next();
      } else {
        failed(res, {
          code: 401,
          message: 'Your email is not verified yet',
          error: 'Unauthorized',
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  isWorker: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 1) {
      next();
    } else {
      failed(res, {
        code: 403,
        message: "You don't have permission!",
        error: 'Forbidden',
      });
    }
  },
  isRecruiter: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 2) {
      next();
    } else {
      failed(res, {
        code: 403,
        message: "You don't have permission!",
        error: 'Forbidden',
      });
    }
  },
};
