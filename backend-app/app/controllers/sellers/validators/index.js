const {validateCreateSeller} = require('./validateCreateSeller')
const {validateDeleteSeller} = require('./validateDeleteSeller')
const {validateGetSeller} = require('./validateGetSeller')
const {validateUpdateSeller} = require('./validateUpdateSeller')
const {populateSeller} = require('./populateSeller')
const {validateChangePassword} = require('../profile/validators')

const {
  validateForgotPassword,
  validateLogin,
  validateResetPassword,
  validateVerify
} = require('../auth/validators')

module.exports = {
  validateCreateSeller,
  validateDeleteSeller,
  validateGetSeller,
  validateUpdateSeller,
  populateSeller,
  validateForgotPassword,
  validateLogin,
  validateResetPassword,
  validateVerify,
  validateChangePassword
}
