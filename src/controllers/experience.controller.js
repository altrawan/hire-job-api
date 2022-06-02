const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helpers/response');
const experienceModel = require('../models/experience.model');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  getExperienceByWorkerId: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await experienceModel.getExperienceByWorkerId(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Experience by id ${id} not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get experience by id`,
        data: result.rows,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  getExperienceById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await experienceModel.getExperienceById(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Experience by id ${id} not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get experience by id`,
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
  createExperience: async (req, res) => {
    try {
      const { body } = req;
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const setData = {
        id: uuidv4(),
        userId,
        image: req.file ? req.file.filename : 'default.png',
        ...body,
      };
      const result = await experienceModel.createExperience(setData);
      return success(res, {
        code: 201,
        message: `Success create experience`,
        data: result,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(`public/uploads/experience/${req.file.filename}`);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  updateExperience: async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = await experienceModel.getExperienceById(id);

      if (!user.rowCount) {
        if (req.file) {
          deleteFile(`public/uploads/experience/${req.file.filename}`);
        }
        return failed(res, {
          code: 404,
          message: `Experience by id ${id} not found`,
          error: 'Not Found',
        });
      }

      let { image } = user.rows[0];
      if (req.file) {
        if (image !== 'default.png') {
          deleteFile(`public/uploads/experience/${image}`);
        }
        image = req.file.filename;
      }

      const setData = {
        ...body,
        image,
        updatedAt: new Date(Date.now()),
      };

      const result = await experienceModel.updateExperience(
        setData,
        user.rows[0].id
      );
      return success(res, {
        code: 200,
        message: 'Success edit profile',
        data: result,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(`public/uploads/experience/${req.file.filename}`);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  deleteExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await experienceModel.getExperienceById(id);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `Experience by id ${id} not found`,
          error: 'Not Found',
        });
      }

      if (user.rows[0].image) {
        deleteFile(`public/uploads/experience/${user.rows[0].image}`);
      }

      await experienceModel.deleteExperience(user.rows[0].id);

      return failed(res, {
        code: 200,
        message: `Success delete experience`,
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
