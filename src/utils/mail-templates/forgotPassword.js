/**
 * handles mailing service
 * @param {string} email string containing mailing credentials
 * @param {string} baseUrl string containing mailing credentials
 * @param {string} hash string containing mailing credentials
 * @returns {object} object in json
 */
export default (email, baseUrl, hash) => ({
    from: 'Haus Party <dev.hausparty@gmail.com>',
    to: email,
    subject: 'Link To Reset Password',
    text:
      'Hi from Haus Party.\n\n'
      + 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
      + `${baseUrl}/reset?token=${hash}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  });
  