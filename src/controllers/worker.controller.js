const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { success, failed } = require('../helpers/response');
const authModel = require('../models/auth.model');
const workerModel = require('../models/worker.model');
const skillModel = require('../models/skill.model');
const portofolioModel = require('../models/portofolio.model');
const experienceModel = require('../models/experience.model');
const pagination = require('../utils/pagination');
const deleteFile = require('../utils/deleteFile');
const uploadGoogleDrive = require('../utils/uploadGoogleDrive');
const deleteGoogleDrive = require('../utils/deleteGoogleDrive');

module.exports = {
  getAllWorker: async (req, res) => {
    try {
      let { page, limit, search, sort, sortType } = req.query;

      page = Number(page) || 1;
      limit = Number(limit) || 4;
      search = search || '';
      sort = sort || 'name';
      sortType = sortType || 'ASC';
      const offset = (page - 1) * limit;

      const count = await workerModel.getCountWorker();

      const result = await workerModel.getAllWorker(
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
          const skill = await skillModel.getSkillByWorkerId(item.id);
          const portofolio = await portofolioModel.getPortofolioByWorkerId(
            item.id
          );
          const experience = await experienceModel.getExperienceByWorkerId(
            item.id
          );

          const obj = {
            user: item,
            login: login.rows,
            skill: skill.rows,
            portofolio: portofolio.rows,
            experience: experience.rows,
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

      const login = await authModel.getUserByUserId(id);
      const skill = await skillModel.getSkillByWorkerId(id);
      const portofolio = await portofolioModel.getPortofolioByWorkerId(id);
      const experience = await experienceModel.getExperienceByWorkerId(id);

      success(res, {
        code: 200,
        message: `Success get user by id`,
        data: {
          user: user.rows[0],
          login: login.rows,
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
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const {
        name,
        email,
        phoneNumber,
        jobDesk,
        jobStatus,
        domicile,
        workPlace,
        description,
        instagram,
        github,
        gitlab,
        linkedin,
      } = req.body;
      const user = await workerModel.getWorkerById(userId);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User by id ${userId} not found`,
          error: 'Not Found',
        });
      }

      const setData = {
        name,
        jobDesk,
        jobStatus,
        domicile,
        workPlace,
        description,
        instagram,
        github,
        gitlab,
        linkedin,
        updatedAt: new Date(Date.now()),
      };

      const setAccount = {
        email,
        phoneNumber,
        updatedAt: new Date(Date.now()),
      };

      const result = await workerModel.updateWorker(setData, userId);
      const login = await workerModel.updateAccount(setAccount, userId);

      // add skill
      const { skillName } = req.body;
      if (skillName) {
        await skillModel.deleteAllSkill(userId);
        for (let i = 0; i < skillName.length; i++) {
          const setData = {
            id: uuidv4(),
            userId,
            skillName: skillName[i],
          };
          await skillModel.createSkill(setData);
        }
      }

      console.log(req.files.logo);

      // add experience
      const { experience } = req.body;
      if (experience) {
        await experienceModel.deleteAllExperience(userId);
        experience.map(async (item) => {
          const photoGd = await uploadGoogleDrive(req.files.logo[0]);
          const setExperience = {
            id: uuidv4(),
            userId,
            image: req.files.logo[0] ? photoGd.id : null,
            ...item,
          };
          await experienceModel.createExperience(setExperience);
          deleteFile(req.files.logo[0].path);
        });
      }

      const portofolioId = uuidv4();
      const { portofolio } = req.body;
      if (portofolio) {
        await portofolioModel.deleteAllPortofolio(userId);
        portofolio.map(async (item) => {
          const setPortofolio = {
            id: portofolioId,
            userId,
            ...item,
          };
          await portofolioModel.createPortofolio(setPortofolio);
        });
      }

      if (req.files) {
        if (req.files.photo) {
          req.files.photo.map(async (item) => {
            // upload new image to google drive
            const photoGd = await uploadGoogleDrive(item);
            const setImage = {
              id: uuidv4(),
              portofolioId,
              image: photoGd.id,
            };
            await portofolioModel.uploadImage(setImage);
            // remove photo after upload
            deleteFile(item.path);
          });
        }
      }
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
          deleteFile(req.file.path);
        }
        return failed(res, {
          code: 404,
          message: `User by id ${id} not found`,
          error: 'Not Found',
        });
      }
      // upload image to google drive
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

      const result = await workerModel.updateImage(setData, id);
      return success(res, {
        code: 200,
        message: 'Success update image user',
        data: result,
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
