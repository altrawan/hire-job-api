const bcrypt = require('bcrypt');
const { success, failed } = require('../helpers/response');
const workerModel = require('../models/worker.model');
const skillModel = require('../models/skill.model');
const portofolioModel = require('../models/portofolio.model');
const experienceModel = require('../models/experience.model');
const pagination = require('../utils/pagination');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  getAllWorker: async (req, res) => {
    try {
      let { page, limit, search, sort, sortType } = req.query;

      search = search ? `%${search}%` : '%';
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

      const data = await Promise.all(
        result.rows.map(async (item) => {
          const getSkill = await skillModel.getSkillByWorkerId(item.id);
          const getPortofolio = await portofolioModel.getPortofolioByWorkerId(
            item.id
          );
          const getExperience = await experienceModel.getExperienceByWorkerId(
            item.id
          );

          const obj = {
            user: item,
            skill: getSkill.rows,
            portofolio: getPortofolio.rows,
            experience: getExperience.rows,
          };

          return obj;
        })
      );

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
  getWorkerById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await workerModel.getWorkerById(id);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }

      const skill = await skillModel.getSkillByWorkerId(id);
      const portofolio = await portofolioModel.getPortofolioByWorkerId(id);
      const experience = await experienceModel.getExperienceByWorkerId(id);

      success(res, {
        code: 200,
        message: `Success get user by id`,
        data: {
          user: user.rows[0],
          skill: skill.rows,
          portofolio: portofolio.rows,
          experience: experience.rows,
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

      const result = await workerModel.updateWorker(setData, id);
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
  updateImage: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.user_id;
      const user = await workerModel.getWorkerById(id);

      if (!user.rowCount) {
        if (req.file) {
          deleteFile(`public/uploads/worker/${req.file.filename}`);
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
          deleteFile(`public/uploads/worker/${photo}`);
        }
        photo = req.file.filename;
      }
      const setData = {
        photo,
        updatedAt: new Date(Date.now()),
      };

      const result = await workerModel.updateImage(setData, id);
      return success(res, {
        code: 200,
        message: 'Success update image user',
        data: result,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(`public/uploads/worker/${req.file.filename}`);
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

      const result = await workerModel.updatePassword(setData, id);
      return success(res, {
        code: 200,
        message: `Success update password`,
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
