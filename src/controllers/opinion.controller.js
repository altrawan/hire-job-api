const opinionModel = require('../models/opinion.model');
const { success, failed } = require('../helpers/response');

module.exports = {
  getOpinion: async (req, res) => {
    try {
      const result = await opinionModel.getOpinion();

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Data not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get opinion`,
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
};
