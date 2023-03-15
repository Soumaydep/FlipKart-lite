import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY, {
    expiresIn: "15d",
  });
};

module.exports = generateToken;
