const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { success, failed } = require('../helpers/response');
const jwtToken = require('../utils/generateJwtToken');
const authModel = require('../models/auth.model');
const userModel = require('../models/user.model');
const { sendEmail, resetPassword } = require('../utils/nodemailer');
const { API_URL, APP_CLIENT } = require('../helpers/env');

module.exports = {
  registerWorker: async (req, res) => {
    try {
      const { name, email, phoneNumber, password, passwordConfirmation } =
        req.body;

      const checkUser = await userModel.getUserByEmail(email);
      if (checkUser.rowCount > 0) {
        return failed(res, {
          code: 409,
          message: 'Email already exist',
          error: 'Conflict',
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const setData = {
        id: uuidv4(),
        name,
        email,
        phoneNumber,
        password: hashPassword,
        photo: 'profile-default.png',
        role: 'Worker',
        verifyToken: crypto.randomBytes(30).toString('hex'),
        isVerified: 0,
        isActive: 0,
      };

      const setDataEmail = {
        to: email,
        subject: 'Please Confirm Your Account',
        text: 'Confirm Your email Ankasa Ticketing Account',
        template: 'email',
        context: {
          url: `${API_URL}auth/verify-token?token=${token}`,
          name,
        },
      };

      await sendEmail(setDataEmail);
      await authModel.register(setData);
      return success(res, {
        code: 201,
        message: 'Success Registered, please verification your email',
        data: setData,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  verifyEmail: async (req, res) => {
    const { token } = req.query;
    const checkToken = await authModel.getUserByToken(token);
    if (checkToken.rowCount) {
      if (!checkToken.rowCount) {
        return failed(res, {
          code: 400,
          message: 'Activation failed',
          error: 'Bad Request',
        });
      }

      await authModel.updateToken(token);
      res.render('./welcome.ejs', {
        name: checkToken.rows[0].name,
        url_home: `${APP_CLIENT}`,
        url_login: `${APP_CLIENT}/login`,
      });
    } else {
      failed(res, {
        code: 500,
        message: err.message,
        error: 'Internal Server Error',
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const checkUser = await userModel.getUserByEmail(email);
      if (checkUser.rowCount > 0) {
        if (checkUser.rows[0].is_active) {
          const match = await bcrypt.compare(
            password,
            checkUser.rows[0].password
          );
          if (match) {
            const jwt = await jwtToken(checkUser.rows[0]);
            success(res, {
              code: 200,
              message: 'Login sucess',
              data: null,
              token: jwt,
            });
          } else {
            return failed(res, {
              code: 401,
              message: 'Wrong email or password',
              error: 'Unauthorized',
            });
          }
        } else {
          return failed(res, {
            code: 403,
            message: 'Your account has been banned',
            error: 'Forbidden',
          });
        }
      } else {
        return failed(res, {
          code: 401,
          message: 'Wrong email or password',
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
};
