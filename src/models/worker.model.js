const db = require('../config/pg');

module.exports = {
  getAllWorker: (paging, search, sort, sortType) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM worker INNER JOIN skills ON worker.id = skills.worker_id WHERE skill_name ILIKE $1 ORDER BY ${sort} ${sortType} LIMIT $2 OFFSET $3`,
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
  getWorkerByEmail: (email) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM worker WHERE email=$1`, [email], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  getWorkerByPhone: (phoneNumber) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM worker WHERE phone_number=$1`,
        [phoneNumber],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  updateWorker: (data, id) => new Promise((resolve, reject) => {}),
  updateImageWorker: (data, id) =>
    new Promise((resolve, reject) => {
      const { photo, updatedAt } = data;
      db.query(
        `UPDATE worker SET photo = $1, updated_at = $2 WHERE id = $3`,
        [photo, updatedAt, id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
};
