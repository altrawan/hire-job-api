const db = require('../config/pg');

module.exports = {
  getPortofolioByWorkerId: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portofolio WHERE worker_id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
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
  getPortofolioImageById: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM portofolio_image WHERE portofolio_id = $1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  createPortofolio: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId, appName, linkRepository, typePortofolio } = data;
      db.query(
        `INSERT INTO portofolio (id, worker_id, app_name, link_repository, type_portofolio, is_active) VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, userId, appName, linkRepository, typePortofolio, 1],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  createPortofolioImage: (data) =>
    new Promise((resolve, reject) => {
      const { id, portofolioId, image } = data;
      db.query(
        `INSERT INTO portofolio_image (id, portofolio_id, image) VALUES ($1, $2, $3)`,
        [id, portofolioId, image],
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
      const { appName, linkRepository, typePortofolio, updatedAt } = data;
      db.query(
        `UPDATE portofolio SET app_name = $1, link_repository = $2, type_portofolio = $3, updated_at = $4 WHERE id = $5`,
        [appName, linkRepository, typePortofolio, updatedAt, id],
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
  updatePortofolioImage: (image, id) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE portofolio_image SET image = $1 WHERE id = $2`,
        [image, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            image,
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
  deletePortofolioImage: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM portofolio_image WHERE portofolio_id = $1`,
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
