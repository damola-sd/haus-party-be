/* eslint-disable max-len */
/**
 * handles mailing service
 * @param {string} email string containing mailing credentials
 * @param {string} firstName string containing mailing credentials
 * @returns {object} object in json
 */
export default (email, firstName) => ({
    from: 'Haus Party <dev.hausparty@gmail.com>',
    to: email,
    subject: `Congrats ${firstName} for comming on MyBukka`,
    text:
      `Hi ${firstName}.\n\n`
      + 'Welcome to HausParty. We wanted to thank you for considering HausParty for your house parties.\n\n'
      + 'Good things are comming your way.',
  });
  