const jwt = require('jsonwebtoken');
// const jwt = require("")

const genrateToken = (data) => {
  const payload = {
    id: data._id,
    email: data.email,
    name: data.name,
  };
  return jwt.sign(payload, process.env.JWT_SECRATE, {
    expiresIn: '30d',
  });
};

module.exports = genrateToken;
