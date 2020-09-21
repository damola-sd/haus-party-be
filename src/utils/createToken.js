import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const CreateToken = (user, time) => jwt.sign(
  {
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  },
  JWT_SECRET,
  { expiresIn: time || '3h' },
);

export default CreateToken;
