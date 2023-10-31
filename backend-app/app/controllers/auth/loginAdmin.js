/* eslint-disable prettier/prettier */
/* eslint-disable max-statements */
const {matchedData} = require('express-validator')

const {
  findUser,
  userIsBlocked,
  checkLoginAttemptsAndBlockExpires,
  passwordsDoNotMatch,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken
} = require('./helpers')

const {handleError} = require('../../middleware/utils')
const {checkPassword} = require('../../middleware/auth')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const loginAdmin = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await findUser(data.email)

    const roles = ['master', 'manager', 'delivery', 'moderator']
    if (roles.indexOf(user.role) > -1) {
      if(!user.deleted) {
        await userIsBlocked(user)
        await checkLoginAttemptsAndBlockExpires(user)
        const isPasswordMatch = await checkPassword(data.password, user)
        if (!isPasswordMatch) {
          handleError(res, await passwordsDoNotMatch(user))
        } else {
          // all ok, register access and return token
          user.loginAttempts = 0
          await saveLoginAttemptsToDB(user)
          res.status(200).json(await saveUserAccessAndReturnToken(req, user))
        }
      } else {
        handleError(res, {
          code: 401,
          message: 'DELETED'
        })
      }
    } else {
      handleError(res, {
        code: 401,
        message: 'UNAUTHORIZED'
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {loginAdmin}
