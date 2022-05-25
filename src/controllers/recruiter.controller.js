const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { success, failed } = require('../helpers/response');
const recruiterModel = require('../models/recruiter.model');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  getRecruiterById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await recruiterModel.getRecruiterById(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get user by id`,
        data: result.rows[0],
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  hireWorker: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;
      const { messageDestination, name, email, phoneNumber, description } =
        req.body;

      const setData = {
        id: uuidv4(),
        userId,
        messageDestination,
        name,
        email,
        phoneNumber,
        description,
      };

      const result = await recruiterModel.createHire(setData);
      return success(res, {
        code: 201,
        message: `Success create hire`,
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
  updateRecruiter: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.user_id;
      const {
        company,
        companyField,
        city,
        description,
        email,
        instagram,
        phoneNumber,
        linkedin,
      } = req.body;

      const checkUser = await recruiterModel.getRecruiterById(id);
      if (!checkUser.rowCount) {
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }

      const setData = {
        company,
        companyField,
        city,
        description,
        instagram,
        linkedin,
        updatedAt: new Date(Date.now()),
      };

      const setAccount = {
        email,
        phoneNumber,
        updatedAt: new Date(Date.now()),
      };

      const user = await recruiterModel.updateRecruiter(setData, id);
      const login = await recruiterModel.updateAccount(setAccount, id);

      const result = {
        ...user,
        ...login,
      };
      return success(res, {
        code: 200,
        message: 'Success edit profile',
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
  updatePhoto: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.user_id;
      const user = await recruiterModel.getRecruiterById(id);

      if (!user.rowCount) {
        if (req.file) {
          deleteFile(`public/uploads/recruiter/${req.file.filename}`);
        }
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }
      let { photo } = user.rows[0];
      if (req.file) {
        if (photo !== 'profile-default.png') {
          deleteFile(`public/uploads/recruiter/${photo}`);
        }
        photo = req.file.filename;
      }
      const setData = {
        photo,
        updatedAt: new Date(Date.now()),
      };
      await recruiterModel.updateImage(setData, id);
      return success(res, {
        code: 200,
        message: 'Success update image user',
        data: setData,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(`public/uploads/recruiter/${req.file.filename}`);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.user_id;
      const { password } = req.body;

      const user = await recruiterModel.getRecruiterById(id);
      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const setData = {
        password: hashPassword,
        updatedAt: new Date(Date.now()),
      };

      await recruiterModel.updatePassword(setData, id);
      return success(res, {
        code: 200,
        message: `Success update password`,
        data: null,
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
