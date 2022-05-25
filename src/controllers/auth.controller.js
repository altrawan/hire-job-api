const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { success, failed } = require('../helpers/response');
const jwtToken = require('../utils/generateJwtToken');
const authModel = require('../models/auth.model');
const workerModel = require('../models/worker.model');
const recruiterModel = require('../models/recruiter.model');
const { sendEmail, sendReset } = require('../utils/nodemailer');
const { API_URL, APP_CLIENT } = require('../helpers/env');

module.exports = {
  registerWorker: async (req, res) => {
    try {
      const { name, email, phoneNumber, password } = req.body;

      const checkUser = await authModel.getUserByEmail(email);

      if (checkUser.rowCount > 0) {
        return failed(res, {
          code: 409,
          message: 'Email already exist',
          error: 'Conflict',
        });
      }

      const checkPhone = await authModel.getUserByPhoneNumber(phoneNumber);
      if (checkPhone.rowCount > 0) {
        return failed(res, {
          code: 409,
          message: 'Phone Number already exist',
          error: 'Conflict',
        });
      }

      const id = uuidv4();
      const hashPassword = await bcrypt.hash(password, 10);
      const token = crypto.randomBytes(30).toString('hex');

      const loginData = {
        id: uuidv4(),
        userId: id,
        email,
        phoneNumber,
        password: hashPassword,
        role: 0,
        verifyToken: token,
      };

      const userData = {
        id,
        name,
        photo: 'profile-default.png',
      };

      const setDataEmail = {
        to: email,
        subject: 'Please Confirm Your Account',
        text: 'Confirm Your email Peworld Hire Job Account',
        template: 'index',
        context: {
          url: `${API_URL}auth/verify-email?token=${token}`,
          name,
        },
      };

      sendEmail(setDataEmail);
      const login = await authModel.createAccount(loginData);
      const user = await authModel.registerWorker(userData);
      const result = {
        ...user,
        ...login,
      };
      return success(res, {
        code: 201,
        message: 'Success Registered, please verification your email',
        data: result,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  registerRecruiter: async (req, res) => {
    try {
      const { name, email, company, position, phoneNumber, password } =
        req.body;

      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.rowCount > 0) {
        return failed(res, {
          code: 409,
          message: 'Email already exist',
          error: 'Conflict',
        });
      }

      const checkPhone = await authModel.getUserByPhoneNumber(phoneNumber);
      if (checkPhone.rowCount > 0) {
        return failed(res, {
          code: 409,
          message: 'Phone Number already exist',
          error: 'Conflict',
        });
      }

      const id = uuidv4();
      const hashPassword = await bcrypt.hash(password, 10);
      const token = crypto.randomBytes(30).toString('hex');

      const loginData = {
        id: uuidv4(),
        userId: id,
        email,
        phoneNumber,
        password: hashPassword,
        role: 1,
        verifyToken: token,
      };

      const userData = {
        id,
        name,
        company,
        position,
        photo: 'profile-default.png',
      };

      const setDataEmail = {
        to: email,
        subject: 'Please Confirm Your Account',
        text: 'Confirm Your email Peworld Hire Job Account',
        template: 'index',
        context: {
          url: `${API_URL}auth/verify-token?token=${token}`,
          name,
        },
      };

      sendEmail(setDataEmail);
      const login = await authModel.createAccount(loginData);
      const user = await authModel.registerRecruiter(userData);
      const result = {
        ...user,
        ...login,
      };
      return success(res, {
        code: 201,
        message: 'Success Registered, please verification your email',
        data: result,
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
    try {
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

        await authModel.activateEmail(token);
        res.render('./welcome.ejs', {
          name: checkToken.rows[0].name,
          url_home: `${APP_CLIENT}`,
          url_login: `${APP_CLIENT}/worker/login`,
        });
      } else {
        failed(res, {
          code: 404,
          message: 'Token not found',
          error: 'Not Found',
        });
      }
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  loginAccount: async (req, res) => {
    try {
      const { email, password } = req.body;

      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.rowCount > 0) {
        if (checkUser.rows[0].is_active) {
          const match = await bcrypt.compare(
            password,
            checkUser.rows[0].password
          );
          if (match) {
            const jwt = jwtToken(checkUser.rows[0]);
            return success(res, {
              code: 200,
              message: 'Login sucess',
              data: req.body,
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
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const checkUser = await authModel.getUserByEmail(email);
      if (checkUser.rowCount) {
        const token = crypto.randomBytes(30).toString('hex');

        const setDataReset = {
          to: email,
          subject: 'Please Confirm Your Reset Password',
          text: 'Confirm Your Reset Password Peworld Hire Job Account',
          template: 'index',
          context: {
            url: `${API_URL}auth/reset-password?token=${token}`,
            name: checkUser.rows[0].name,
          },
        };

        sendReset(setDataReset);
        const result = await authModel.updateToken(token, checkUser.rows[0].id);
        return success(res, {
          code: 200,
          message: 'Password reset has been sent via email',
          data: result,
        });
      } else {
        return failed(res, {
          code: 404,
          message: 'Email not found',
          error: 'Not Found',
        });
      }
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.query;
      const checkUser = await authModel.getUserByToken(token);

      if (!checkUser.rowCount) {
        return failed(res, {
          code: '401',
          message: 'Invalid token',
          error: 'Unauthorized',
        });
      }

      const password = await bcrypt.hash(req.body.password, 10);
      const result = await authModel.updatePassword(
        password,
        checkUser.rows[0].id
      );

      return success(res, {
        code: 200,
        message: 'Reset Password Success',
        data: result,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
};
