const db = require('../config/pg');

module.exports = {
  getAllRecruiter: (search, sort, sortType, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM recruiter WHERE name ILIKE ('%${search}%') ORDER BY ${sort} ${sortType} LIMIT $1 OFFSET $2`,
        [limit, offset],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getCountRecruiter: () =>
    new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) FROM recruiter`, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  getRecruiterById: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recruiter WHERE id=$1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  createHire: (data) =>
    new Promise((resolve, reject) => {
      const {
        id,
        userId,
        toUser,
        messageDestination,
        name,
        email,
        phoneNumber,
        description,
      } = data;
      db.query(
        `INSERT INTO hire (id, user_id, to_user, message_destination, name, email, phone_number, description, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          id,
          userId,
          toUser,
          messageDestination,
          name,
          email,
          phoneNumber,
          description,
          1,
        ],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  updateRecruiter: (data, id) =>
    new Promise((resolve, reject) => {
      const {
        name,
        position,
        company,
        companyField,
        city,
        description,
        instagram,
        linkedin,
      } = data;
      db.query(
        `UPDATE recruiter SET name = $1, position = $2, company = $3, company_field = $4, 
        city = $5, description = $6, instagram = $7, linkedin = $8 WHERE id = $9`,
        [
          name,
          position,
          company,
          companyField,
          city,
          description,
          instagram,
          linkedin,
          id,
        ],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            ...data,
          };
          resolve(newData);
        }
      );
    }),
  updateAccount: (data, id) =>
    new Promise((resolve, reject) => {
      const { email, phoneNumber, updatedAt } = data;
      db.query(
        `UPDATE login SET email = $1, phone_number = $2, updated_at = $3 WHERE user_id = $4`,
        [email, phoneNumber, updatedAt, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            ...data,
          };
          resolve(newData);
        }
      );
    }),
  updateImage: (data, id) =>
    new Promise((resolve, reject) => {
      const { photo, updatedAt } = data;
      db.query(
        `UPDATE recruiter SET photo = $1, updated_at = $2 WHERE id = $3`,
        [photo, updatedAt, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            ...data,
          };
          resolve(newData);
        }
      );
    }),
  updatePassword: (data, id) =>
    new Promise((resolve, reject) => {
      const { password, updatedAt } = data;
      db.query(
        `UPDATE login SET password  =$1, updated_at = $2 WHERE user_id = $3`,
        [password, updatedAt, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            ...data,
          };
          resolve(newData);
        }
      );
    }),
};
