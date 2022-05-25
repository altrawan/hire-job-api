const db = require('../config/pg');

module.exports = {
  getMessageById: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM message WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  getMessageBySender: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM message WHERE from_user = $1`,
        [id],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getMessageByReceiver: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM message WHERE to_user = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  createMessage: (data) =>
    new Promise((resolve, reject) => {
      const { id, fromUser, toUser, message } = data;
      db.query(
        `INSERT INTO message (id, from_user, to_user, message) VALUES ($1, $2, $3, $4)`,
        [id, fromUser, toUser, message],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  deleteMessage: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM message WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
};
