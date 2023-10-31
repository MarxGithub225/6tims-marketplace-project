const User = require('../../../models/user')
const {buildErrObject} = require('../../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDb = ({
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
      item = JSON.parse(JSON.stringify(item))

      delete item.password
      delete item.blockExpires
      delete item.loginAttempts

      resolve(item)
    })
  })
}

module.exports = {createItemInDb}
