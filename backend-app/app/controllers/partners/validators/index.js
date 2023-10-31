const {validateCreatePartner} = require('./validateCreatePartner')
const {validateDeletePartner} = require('./validateDeletePartner')
const {validateGetPartner} = require('./validateGetPartner')
const {validateUpdatePartner} = require('./validateUpdatePartner')
const {populatePartner} = require('./populatePartner')

module.exports = {
  validateCreatePartner,
  validateDeletePartner,
  validateGetPartner,
  validateUpdatePartner,
  populatePartner
}
