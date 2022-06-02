const db = require('../config/pg');

module.exports = {
  getExperienceByWorkerId: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM experience WHERE worker_id=$1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getCountExperienceByWorkerId: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) FROM experience WHERE worker_id=$1`,
        [id],
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
  createExperience: (data) =>
    new Promise((resolve, reject) => {
      const {
        id,
        userId,
        company,
        position,
        start_date,
        end_date,
        description,
        image,
      } = data;
      db.query(
        `INSERT INTO experience (id, worker_id, company, position, start_date, end_date, description, image, is_active) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          id,
          userId,
          company,
          position,
          start_date,
          end_date,
          description,
          image,
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
  updateExperience: (data, id) =>
    new Promise((resolve, reject) => {
      const {
        position,
        company,
        start_date,
        end_date,
        description,
        image,
        updatedAt,
      } = data;
      db.query(
        `UPDATE experience SET position = $1, company = $2, start_date = $3, end_date = $4, description = $5, image = $6, updated_at = $7 WHERE id = $8`,
        [
          position,
          company,
          start_date,
          end_date,
          description,
          image,
          updatedAt,
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
  deleteExperience: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM experience WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  deleteAllExperience: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM experience WHERE worker_id = $1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
};
