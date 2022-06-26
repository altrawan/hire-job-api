const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { success, failed } = require('../helpers/response');
const recruiterModel = require('../models/recruiter.model');
const authModel = require('../models/auth.model');
const pagination = require('../utils/pagination');
const deleteFile = require('../utils/deleteFile');
const uploadGoogleDrive = require('../utils/uploadGoogleDrive');
const deleteGoogleDrive = require('../utils/deleteGoogleDrive');

module.exports = {
  getAllRecruiter: async (req, res) => {
    try {
      let { page, limit, search, sort, sortType } = req.query;

      page = Number(page) || 1;
      limit = Number(limit) || 4;
      search = search || '';
      sort = sort || 'name';
      sortType = sortType || 'ASC';
      const offset = (page - 1) * limit;

      const count = await recruiterModel.getCountRecruiter();

      const result = await recruiterModel.getAllRecruiter(
        search,
        sort,
        sortType,
        limit,
        offset
      );

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: 'Data not found',
          error: 'Not Found',
        });
      }

      const data = await Promise.all(
        result.rows.map(async (item) => {
          const login = await authModel.getUserByUserId(item.id);

          const obj = {
            user: item,
            login: login.rows,
          };

          return obj;
        })
      );

      // pagination with search
      if (search) {
        const paging = pagination(result.rowCount, page, limit);
        return success(res, {
          code: 200,
          message: `Success get all users data`,
          data,
          pagination: paging.response,
        });
      }

      // Paginatin without search
      const paging = pagination(count.rows[0].count, page, limit);
      return success(res, {
        code: 200,
        message: `Success get all users data`,
        data,
        pagination: paging.response,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
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

      const login = await authModel.getUserByUserId(id);

      success(res, {
        code: 200,
        message: `Success get user by id`,
        data: {
          user: result.rows[0],
          login: login.rows,
        },
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
      const {
        toUser,
        messageDestination,
        name,
        email,
        phoneNumber,
        description,
      } = req.body;

      const setData = {
        id: uuidv4(),
        userId,
        toUser,
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
        name,
        position,
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
        name,
        position,
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
          deleteFile(req.file.path);
        }
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }

      let { photo } = user.rows[0];
      if (req.file) {
        if (photo) {
          // remove old image except default image
          deleteGoogleDrive(photo);
        }
        // upload new image to google drive
        const photoGd = await uploadGoogleDrive(req.file);
        photo = photoGd.id;
        // remove image after upload
        deleteFile(req.file.path);
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
        deleteFile(req.file.path);
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
