const {blockIsExpired} = require('./blockIsExpired')
const {blockUser} = require('./blockUser')
const {
  checkLoginAttemptsAndBlockExpires
} = require('./checkLoginAttemptsAndBlockExpires')
const {findForgotPassword} = require('./findForgotPassword')
const {findUser} = require('./findUser')
const {findUserById} = require('./findUserById')
const {findUserToResetPassword} = require('./findUserToResetPassword')
const {forgotPasswordResponse} = require('./forgotPasswordResponse')
const {generateToken} = require('./generateToken')
const {getUserIdFromToken} = require('./getUserIdFromToken')
const {markResetPasswordAsUsed} = require('./markResetPasswordAsUsed')
const {passwordsDoNotMatch} = require('./passwordsDoNotMatch')
const {returnRegisterToken} = require('./returnRegisterToken')
const {saveForgotPassword} = require('./saveForgotPassword')
const {saveLoginAttemptsToDB} = require('./saveLoginAttemptsToDB')
const {saveUserAccessAndReturnToken} = require('./saveUserAccessAndReturnToken')
const {setUserInfo} = require('./setUserInfo')
const {updatePassword} = require('./updatePassword')
const {userIsBlocked} = require('./userIsBlocked')
const {verificationExists} = require('./verificationExists')
const {verifyUser} = require('./verifyUser')
const {cancelUser} = require('./cancelUser')
const {userIsNotVerified} = require('./userIsNotVerified')
const {userIsDeleted} = require('./userIsDeleted')
const {checkSellerPermissions} = require('./checkSellerPermissions')

module.exports = {
  blockIsExpired,
  blockUser,
  checkLoginAttemptsAndBlockExpires,
  findForgotPassword,
  findUser,
  findUserById,
  findUserToResetPassword,
  forgotPasswordResponse,
  generateToken,
  getUserIdFromToken,
  markResetPasswordAsUsed,
  passwordsDoNotMatch,
  returnRegisterToken,
  saveForgotPassword,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken,
  setUserInfo,
  updatePassword,
  userIsBlocked,
  verificationExists,
  verifyUser,
  cancelUser,
  userIsNotVerified,
  userIsDeleted,
  checkSellerPermissions
}
