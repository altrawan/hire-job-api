const db = require('../config/pg');

module.exports = {
  createHire: (data) =>
    new Promise((resolve, reject) => {
      const {
        id,
        userId,
        messageDestination,
        name,
        email,
        phoneNumber,
        description,
      } = data;
      db.query(
        `INSERT INTO hire (id, user_id, message_destination, name, email, phone_number, description, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          id,
          userId,
          messageDestination,
          name,
          email,
          phoneNumber,
          description,
          1,
        ],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  updateRecruiter: (data, id) => new Promise((resolve, reject) => {}),
};
