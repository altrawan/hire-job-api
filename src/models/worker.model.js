const db = require('../config/pg');

module.exports = {
  getAllWorker: (paging, search, sort, sortType) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM worker WHERE name ILIKE $1 ORDER BY ${sort} ${sortType} LIMIT $2 OFFSET $3`,
        [search, paging.limit, paging.offset],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getCountWorker: () =>
    new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) FROM worker`, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  getWorkerById: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM worker WHERE id=$1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  updateWorker: (data, id) =>
    new Promise((resolve, reject) => {
      const { name, jobDesk, domicile, workPlace, description, updatedAt } =
        data;
      db.query(
        `UPDATE worker SET name = $1, job_desk = $2, domicile = $3, work_place = $4, description = $5, updated_at = $6 WHERE id = $7`,
        [name, jobDesk, domicile, workPlace, description, updatedAt, id],
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
        `UPDATE worker SET photo = $1, updated_at = $2 WHERE id = $3`,
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
        `UPDATE login SET password=$1, updated_at=$2 WHERE user_id=$3`,
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
