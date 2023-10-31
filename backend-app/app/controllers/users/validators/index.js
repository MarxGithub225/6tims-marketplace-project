const {validateCreateUser} = require('./validateCreateUser')
const {validateDeleteUser} = require('./validateDeleteUser')
const {validateGetUser} = require('./validateGetUser')
const {validateUpdateUser} = require('./validateUpdateUser')
const {populateUser} = require('./populateUser')

module.exports = {
  validateCreateUser,
  validateDeleteUser,
  validateGetUser,
  validateUpdateUser,
  populateUser
}
