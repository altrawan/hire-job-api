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
  createSkill: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const { skillName } = req.body;

      const user = await workerModel.getWorkerById(userId);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User by id ${userId} not found`,
          error: 'Not Found',
        });
      }

      for (let i = 0; i < skillName.length; i++) {
        const setData = {
          id: uuidv4(),
          userId,
          skillName: skillName[i],
        };
        await workerModel.createSkill(setData);
      }

      return success(res, {
        code: 201,
        message: `Success create skills`,
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
  updateWorker: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.user_id;
      const { name, jobDesk, domicile, workPlace, description } = req.body;
      const user = await workerModel.getWorkerById(id);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }

      const setData = {
        name,
        jobDesk,
        domicile,
        workPlace,
        description,
        updatedAt: new Date(Date.now()),
      };

      await workerModel.updateWorker(setData, id);
      return success(res, {
        code: 200,
        message: 'Success edit profile',
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
  updateImage: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.user_id;
      const user = await workerModel.getWorkerById(id);

      if (!user.rowCount) {
        if (req.file) {
          deleteFile(`public/uploads/users/${req.file.filename}`);
        }
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }
      let { photo } = user.rows[0];
      if (req.file) {
        if (user.rows[0].photo !== 'profile-default.png') {
          deleteFile(`public/uploads/users/${user.rows[0].photo}`);
        }
        photo = req.file.filename;
      }
      const setData = {
        photo,
        updatedAt: new Date(Date.now()),
      };
      await workerModel.updateImage(setData, id);
      return success(res, {
        code: 200,
        message: 'Success update image user',
        data: setData,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(`public/uploads/users/${req.file.filename}`);
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

      const user = await workerModel.getWorkerById(id);
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
      await workerModel.updatePassword(setData, id);

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
