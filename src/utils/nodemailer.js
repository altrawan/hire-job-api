const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const {
  HOST_STMP,
  PORT_STMP,
  EMAIL_AUTH_STMP,
  PASS_AUTH_STMP,
  EMAIL_FROM,
} = require('../helpers/env');

const transporter = nodemailer.createTransport({
  host: HOST_STMP,
  port: PORT_STMP,
  secure: false,
  auth: {
    user: EMAIL_AUTH_STMP,
    pass: PASS_AUTH_STMP,
  },
});

module.exports = {
  sendEmail: (data) =>
    new Promise((resolve, reject) => {
      transporter.use(
        'compile',
        hbs({
          viewEngine: {
            extname: '.html',
            partialsDir: path.resolve('./src/template/email'),
            defaultLayout: false,
          },
          viewPath: path.resolve('./src/template/email'),
          extName: '.html',
        })
      );

      const emailOptions = {
        from: `"Preworld Hire" <${EMAIL_FROM}>`,
        to: data.to,
        subject: data.subject,
        text: data.text,
        template: data.template,
        context: data.context,
      };

      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    }),
};
