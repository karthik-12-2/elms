const bcrypt = require('bcrypt');

const hashPassword = (password) => {
      return new Promise((resolve, reject) =>
            bcrypt.hash(password, 10, (err, hash) => {
                  if (err) {
                        throw new Error('Error hashing password');
                  }
                  return resolve(hash);
            })
      )
}

const comparePassword = (password, hash) => {
      return new Promise((resolve, reject) =>
            bcrypt.compare(password, hash, (err, result) => {
                  if (err) {
                        throw new Error('Error comparing password');
                  }
                  return resolve(result);
            })
      )
}

module.exports = {
      hashPassword,
      comparePassword
};