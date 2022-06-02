const db = require('../config/pg');

module.exports = {
  getAllWorker: (search, sort, sortType, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM worker WHERE name ILIKE ('%${search}%') ORDER BY ${sort} ${sortType} LIMIT $1 OFFSET $2`,
        [limit, offset],
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
      const {
        name,
        jobDesk,
        jobStatus,
        domicile,
        workPlace,
        description,
        instagram,
        github,
        gitlab,
        linkedin,
        updatedAt,
      } = data;
      db.query(
        `UPDATE worker SET name = $1, job_desk = $2, job_status = $3, domicile = $4, 
        work_place = $5, description = $6, instagram = $7, github = $8, gitlab = $9, 
        linkedin = $10, updated_at = $11 WHERE id = $12`,
        [
          name,
          jobDesk,
          jobStatus,
          domicile,
          workPlace,
          description,
          instagram,
          github,
          gitlab,
          linkedin,
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
