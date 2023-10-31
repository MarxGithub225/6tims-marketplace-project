const User = require('../../../models/user')
const {buildErrObject} = require('../../../middleware/utils')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = ({
  firstName = '',
  imageId = null,
  lastName = '',
  email = '',
  address = null,
  gender = '',
  password = '',
  role = ''
}) => {
  return new Promise((resolve, reject) => {
    const user = new User({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      imageId,
      email,
      address,
      gender,
      password,
      role
    })
    user.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

module.exports = {registerUser}
