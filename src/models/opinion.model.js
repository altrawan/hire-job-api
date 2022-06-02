const db = require('../config/pg');

module.exports = {
  getOpinion: () =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM opinion`, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res);
      });
    }),
};
