const db = require('../config/pg');

module.exports = {
  getSkillByWorkerId: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skills WHERE worker_id = $1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getSkillById: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skills WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  createSkill: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId, skillName } = data;
      db.query(
        `INSERT INTO skills (id, worker_id, skill_name, is_active) VALUES($1, $2, $3, $4)`,
        [id, userId, skillName, 1],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  deleteSkill: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM skills WHERE id=$1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  deleteAllSkill: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM skills WHERE worker_id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
};
