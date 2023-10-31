const {forgotPassword} = require('./forgotPassword')
const {getRefreshToken} = require('./getRefreshToken')
const {login} = require('./login')
const {resetPassword} = require('./resetPassword')
const {verify} = require('./verify')
const {roleAuthorization} = require('./roleAuthorization')

module.exports = {
  forgotPassword,
  getRefreshToken,
  login,
  resetPassword,
  verify,
  roleAuthorization
}
