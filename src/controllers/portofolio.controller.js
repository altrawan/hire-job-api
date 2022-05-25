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

      const data = await Promise.all(
        result.rows.map(async (item) => {
          const getImage = await portofolioModel.getPortofolioImageById(
            item.id
          );

          const obj = {
            portofolio: item,
            image: getImage.rows,
          };

          return obj;
        })
      );

      success(res, {
        code: 200,
        message: `Success get portofolio by id`,
        data,
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

      const image = await portofolioModel.getPortofolioImageById(id);

      const data = {
        ...result.rows[0],
        image: image.rows,
      };

      success(res, {
        code: 200,
        message: `Success get portofolio by id`,
        data,
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
      const { appName, linkRepository, typePortofolio } = req.body;
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const id = uuidv4();

      const setData = {
        id,
        userId,
        appName,
        linkRepository,
        typePortofolio,
      };

      const image = req.file ? req.file.filename : 'portofolio-default.png';
      const setImage = {
        id: uuidv4(),
        portofolioId: id,
        image,
      };

      const result = await portofolioModel.createPortofolio(setData);
      await portofolioModel.createPortofolioImage(setImage);
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
      const { body } = req;
      const { id } = req.params;
      const portofolio = await portofolioModel.getPortofolioById(id);
      const images = await portofolioModel.getPortofolioImageById(id);

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

      let { image } = images.rows[0];
      if (req.file) {
        if (image !== 'portofolio-default.png') {
          deleteFile(`public/uploads/portofolio/${image}`);
        }
        image = req.file.filename;
      }

      const setData = {
        ...body,
        updatedAt: new Date(Date.now()),
      };

      const result = await portofolioModel.updatePortofolio(
        setData,
        portofolio.rows[0].id
      );

      await portofolioModel.updatePortofolioImage(image, portofolio.rows[0].id);
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
      await portofolioModel.deletePortofolioImage(id);
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
