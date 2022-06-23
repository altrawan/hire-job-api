const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const { failed } = require('../helpers/response');

// management file
const maxSize = 2 * 1024 * 1024;
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'photo' || file.fieldname === 'logo') {
        cb(null, './public');
      }
    },
    filename: (req, file, cb) => {
      const name = crypto.randomBytes(30).toString('hex');
      const ext = path.extname(file.originalname);
      const filename = `${name}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'photo' || file.fieldname === 'logo') {
      // filter mimetype
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(
          { message: 'Photo extension only can .jpg, .jpeg, and .png' },
          false
        );
      }
    }
  },
  limits: { fileSize: maxSize },
});

// middleware
module.exports = (req, res, next) => {
  const multerFields = multerUpload.fields([
    {
      name: 'logo',
      maxCount: 1,
    },
    {
      name: 'photo',
      maxCount: 100,
    },
  ]);
  multerFields(req, res, (err) => {
    if (err) {
      let errorMessage = err.message;
      if (err.code === 'LIMIT_FILE_SIZE') {
        errorMessage = `File ${err.field} too large, max 2mb`;
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        errorMessage = 'Maximum files that can be uploaded is 100';
      }

      failed(res, {
        code: 400,
        message: 'Upload File Error',
        error: errorMessage,
      });
    } else {
      next();
    }
  });
};
