const UserAccess = require('../../../models/userAccess')
const {setUserInfo} = require('./setUserInfo')
const {generateToken, generateRefreshToken} = require('./generateToken')
const {
  getBrowserInfo,
  getCountry,
  buildErrObject
} = require('../../../middleware/utils')

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const saveUserAccessAndReturnToken = async (req = {}, user = {}) => {
  return new Promise(async (resolve, reject) => {
    const userAccess = new UserAccess({
      email: user.email,
      browser: getBrowserInfo(req),
      address: await getCountry()
    })
    userAccess.save(async (err) => {
      try {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        const userInfo = await setUserInfo(user)
        // Returns data with access token
        resolve({
          token: generateToken(user._id),
          refreshToken: generateRefreshToken(user._id),
          user: userInfo
        })
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {saveUserAccessAndReturnToken}
