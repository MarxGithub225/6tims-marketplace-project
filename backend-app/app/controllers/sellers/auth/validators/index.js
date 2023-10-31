const {validateForgotPassword} = require('./validateForgotPassword')
const {validateLogin} = require('./validateLogin')
const {validateResetPassword} = require('./validateResetPassword')
const {validateVerify} = require('./validateVerify')

module.exports = {
  validateForgotPassword,
  validateLogin,
  validateResetPassword,
  validateVerify
}
