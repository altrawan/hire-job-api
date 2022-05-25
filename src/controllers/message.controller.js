const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helpers/response');
const messageModel = require('../models/message.model');

module.exports = {
  getMessageById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await messageModel.getMessageById(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Message by id ${id} not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get message by id`,
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
  getMessageBySender: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await messageModel.getMessageBySender(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Message by id ${id} not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get message by id`,
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
  getMessageByReceiver: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await messageModel.getMessageByReceiver(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Message by id ${id} not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get message by id`,
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
  createMessage: async (req, res) => {
    try {
      const { body } = req;
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const setData = {
        id: uuidv4(),
        fromUser: userId,
        ...body,
      };

      const result = await messageModel.createMessage(setData);
      return success(res, {
        code: 201,
        message: `Success create message`,
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
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await messageModel.getMessageById(id);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `Message by id ${id} not found`,
          error: 'Not Found',
        });
      }

      await messageModel.deleteMessage(user.rows[0].id);
      return failed(res, {
        code: 200,
        message: `Success delete message`,
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
