const db = require('../config/pg');

module.exports = {
  createExperience: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId, company, position, startDate, endDate, description } =
        data;
      db.query(
        `INSERT INTO experience (id, worker_id, company, position, start_date, end_date, description, is_active) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
        [id, userId, company, position, startDate, endDate, description, 1],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getExperienceById: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM experience WHERE id=$1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  getExperienceByWorkerId: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM experience WHERE worker_id=$1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  updateExperience: (data, id) =>
    new Promise((resolve, reject) => {
      const { position, company, startDate, endDate, description, updatedAt } =
        data;
      db.query(
        `UPDATE experience SET position = $1, company = $2, start_date = $3, end_date = $4, description = $5, updated_at = $6 WHERE id = $7`,
        [position, company, startDate, endDate, description, updatedAt, id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  deleteExperience: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM experience WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
};
