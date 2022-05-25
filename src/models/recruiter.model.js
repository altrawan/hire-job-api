const db = require('../config/pg');

module.exports = {
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
        messageDestination,
        name,
        email,
        phoneNumber,
        description,
      } = data;
      db.query(
        `INSERT INTO hire (id, user_id, message_destination, name, email, phone_number, description, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          id,
          userId,
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
        company,
        companyField,
        city,
        description,
        linkedin,
      } = data;
      db.query(
        `UPDATE recruiter SET company = $1, company_field = $2, city = $3, description = $4, linkedin = $5 WHERE id = $6`,
        [company, companyField, city, description, linkedin, id],
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
