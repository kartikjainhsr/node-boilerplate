import { sendEmail } from '../../utils';

const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { env } = require('../../../config/vars');


const smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ramesh.bansal@daffodilsw.com', // generated ethereal user
    pass: 'daffodil@1234', // generated ethereal password
  },
});

module.exports = {
  User: {
    pre: {
      async save(next) {
        try {
          if (!this.isModified('password')) return next();

          const rounds = env === 'test' ? 1 : 10;

          const hash = await bcrypt.hash(this.password, rounds);
          this.password = hash;

          return next();
        } catch (error) {
          return next(error);
        }
      },
    },
  },
};
