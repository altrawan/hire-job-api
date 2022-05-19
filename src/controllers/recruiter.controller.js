const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { success, failed } = require('../helpers/response');
const userModel = require('../models/recruiter.model');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  hireWorker: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.id;
      const { name, email, phoneNumber, description } = req.body;

      const setData = {
        id: uuidv4(),
        userId,
        name,
        email,
        phoneNumber,
        description,
      };
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  updateRecruiter: async (req, res) => {},
};
