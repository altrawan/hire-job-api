const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helpers/response');
const portofolioModel = require('../models/portofolio.model');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  getPortofolioByWorkerId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await portofolioModel.getPortofolioByWorkerId(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Portofolio by id ${id} not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get portofolio by id`,
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
  getPortofolioById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await portofolioModel.getPortofolioById(id);

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: `Portofolio by id ${id} not found`,
          error: 'Not Found',
        });
      }

      success(res, {
        code: 200,
        message: `Success get portofolio by id`,
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
  createPortofolio: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;

      const setData = {
        id: uuidv4(),
        userId,
        ...req.body,
        image: req.file ? req.file.filename : 'portofolio-default.png',
      };

      const result = await portofolioModel.createPortofolio(setData);
      return success(res, {
        code: 201,
        message: `Success create portofolio`,
        data: result,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(`public/uploads/portofolio/${req.file.filename}`);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  updatePortofolio: async (req, res) => {
    try {
      const { id } = req.params;
      const portofolio = await portofolioModel.getPortofolioById(id);

      if (!portofolio.rowCount) {
        if (req.file) {
          deleteFile(`public/uploads/portofolio/${req.file.filename}`);
        }
        return failed(res, {
          code: 404,
          message: `Portofolio by id ${id} not found`,
          error: 'Not Found',
        });
      }

      let { image } = portofolio.rows[0];
      if (req.file) {
        if (image !== 'portofolio-default.png') {
          deleteFile(`public/uploads/portofolio/${image}`);
        }
        image = req.file.filename;
      }

      const setData = {
        ...req.body,
        image,
        updatedAt: new Date(Date.now()),
      };

      const result = await portofolioModel.updatePortofolio(
        setData,
        portofolio.rows[0].id
      );
      return success(res, {
        code: 200,
        message: 'Success edit profile',
        data: result,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(`public/uploads/portofolio/${req.file.filename}`);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  deletePortofolio: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await portofolioModel.getPortofolioById(id);

      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `Portofolio by id ${id} not found`,
          error: 'Not Found',
        });
      }

      await portofolioModel.deletePortofolio(id);
      return failed(res, {
        code: 200,
        message: `Success delete portofolio`,
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
