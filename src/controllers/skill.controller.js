const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { success, failed } = require('../helpers/response');
const skillModel = require('../models/skill.model');

module.exports = {
  getSkillByWorkerId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await skillModel.getSkillByWorkerId(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Data not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get skill skill by id`,
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
  getSkillById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await skillModel.getSkillById(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: 'Data not found',
          error: 'Not Found',
        });
      }

      return success(res, {
        code: 200,
        message: `Success get skill skill by id`,
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
  createSkill: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const { skillName } = req.body;

      const user = await skillModel.getSkillByWorkerId(userId);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `Skill by id ${userId} not found`,
          error: 'Not Found',
        });
      }

      await skillModel.deleteAllSkill(userId);
      for (let i = 0; i < skillName.length; i++) {
        const setData = {
          id: uuidv4(),
          userId,
          skillName: skillName[i],
        };
        await skillModel.createSkill(setData);
      }

      return success(res, {
        code: 201,
        message: `Success create skills`,
        data: skillName,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  deleteSkill: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await skillModel.getSkillById(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: 'Data not found',
          error: 'Not Found',
        });
      }

      await skillModel.deleteSkill(id);

      return success(res, {
        code: 200,
        message: `Success delete skill by id`,
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
