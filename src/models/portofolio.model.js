const db = require('../config/pg');

module.exports = {
  getPortofolioByWorkerId: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM portofolio WHERE worker_id = $1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getPortofolioById: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portofolio WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  createPortofolio: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId, appName, linkRepository, typePortofolio, image } =
        data;
      db.query(
        `INSERT INTO portofolio (id, worker_id, app_name, link_repository, type_portofolio, image, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [id, userId, appName, linkRepository, typePortofolio, image, 1],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  updatePortofolio: (data, id) =>
    new Promise((resolve, reject) => {
      const { appName, linkRepository, typePortofolio, image, updatedAt } =
        data;
      db.query(
        `UPDATE portofolio SET app_name = $1, link_repository = $2, type_portofolio = $3, image = $4, updated_at = $5 WHERE id = $6`,
        [appName, linkRepository, typePortofolio, image, updatedAt, id],
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
  deletePortofolio: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM portofolio WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
};
