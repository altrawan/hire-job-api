const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { success, failed } = require('../helpers/response');
const workerModel = require('../models/worker.model');
const pagination = require('../utils/pagination');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  getAllWorker: async (req, res) => {
    try {
      let { page, limit, search, sort, sortType } = req.query;

      search = !search ? `%` : `%${search}%`;
      sort = sort || 'name';
      sortType = sortType || 'ASC';

      const count = await workerModel.getCountWorker();
      const paging = pagination(count.rows[0].count, page, limit);

      const result = await workerModel.getAllWorker(
        paging,
        search,
        sort,
        sortType
      );

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: 'Data not found',
          error: 'Not Found',
        });
      }

      return success(res, {
        code: 200,
        message: `Success get all users data`,
        data: result.rows,
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
  getWorkerById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await workerModel.getWorkerById(id);

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
  createSkill: async (req, res) => {},
  updateWorker: async (req, res) => {},
  updateImage: async (req, res) => {
    try {
      const { id } = req.APP_DATA.tokenDecoded;
      const user = await workerModel.getWorkerById(id);

      if (!user.rowCount) {
        if (req.files) {
          if (req.files.photo) {
            deleteFile(req.fies.photo[0].path);
          }
        }

        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }

      let { photo } = user.rows[0];
      if (req.files) {
        if (req.files.photo) {
          if (user.rows[0].photo !== 'profile-default.png') {
            deleteFile(`public/uploads/users/${user.rows[0].photo}`);
          }
          photo = req.files.photo[0].filename;
        }
      }

      const setData = {
        photo,
        updatedAt: new Date(Date.now()),
      };

      const result = await workerModel.updateImage(data, id);
      return success(res, {
        code: 200,
        message: 'Success update image user',
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
  updatePassword: async (req, res) => {
    try {
      const { id } = req.APP_DATA.tokenDecoded;
      const { newPassword } = req.body;

      const user = await workerModel.getUserById(id);
      if (!user.rowCount) {
        if (req.files) {
          if (req.files.photo) {
            deleteFile(req.fies.photo[0].path);
          }
        }

        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);
      const result = await workerModel.updatePassword(hashPassword, id);

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
