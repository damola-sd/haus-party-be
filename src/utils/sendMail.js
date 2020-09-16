// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import dotenv from 'dotenv';

const sgMail = require('@sendgrid/mail');

dotenv.config();

/**
 * handles mailing service
 * @param {object} mailOptions object containing mailing credentials
 * @returns {object} object in json
 */
const sendMail = async (mailOptions) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return sgMail.send(mailOptions)
    .then(response => response)
    .catch(error => console.log(error));
};

export default sendMail;
