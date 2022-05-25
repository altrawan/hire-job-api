const db = require('../config/pg');

module.exports = {
  registerWorker: (data) =>
    new Promise((resolve, reject) => {
      const { id, name, photo } = data;
      db.query(
        `INSERT INTO worker (id, name, photo) VALUES ($1, $2, $3)`,
        [id, name, photo],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  registerRecruiter: (data) =>
    new Promise((resolve, reject) => {
      const { id, name, company, position, photo } = data;
      db.query(
        `INSERT INTO recruiter (id, name, company, position, photo) VALUES ($1, $2, $3, $4, $5)`,
        [id, name, company, position, photo],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  createAccount: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId, email, phoneNumber, password, role, verifyToken } =
        data;
      db.query(
        `INSERT INTO login (id, user_id, email, phone_number, password, role, verify_token, is_verified, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          id,
          userId,
          email.toLowerCase(),
          phoneNumber,
          password,
          role,
          verifyToken,
          0,
          0,
        ],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  getUserByEmail: (email) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM login WHERE email=$1`, [email], (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
  getUserByPhoneNumber: (phoneNumber) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM login WHERE phone_number=$1`,
        [phoneNumber],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getUserByToken: (token) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM login WHERE verify_token=$1`,
        [token],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  activateEmail: (token) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE login SET verify_token=null, is_verified=1, is_active=1 WHERE verify_token=$1`,
        [token],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(token);
        }
      );
    }),
  updateToken: (token, id) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE login SET verify_token=$1 WHERE id=$2`,
        [token, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            token,
          };
          resolve(newData);
        }
      );
    }),
  updatePassword: (password, id) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE login SET password=$1, verify_token=null WHERE id=$2`,
        [password, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newData = {
            id,
            password,
          };
          resolve(newData);
        }
      );
    }),
};
