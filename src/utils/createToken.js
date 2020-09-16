import jwt from 'jsonwebtoken';

const { SECRET } = process.env;

const CreateToken = (user, time) => jwt.sign(
  {
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  },
  SECRET,
  { expiresIn: time || '3h' },
);

export default CreateToken;
