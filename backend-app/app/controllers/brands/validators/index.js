const {validateCreateBrand} = require('./validateCreateBrand')
const {validateDeleteBrand} = require('./validateDeleteBrand')
const {validateGetBrand} = require('./validateGetBrand')
const {validateUpdateBrand} = require('./validateUpdateBrand')

const {populateBrand} = require('./populateBrand')
module.exports = {
  validateCreateBrand,
  validateDeleteBrand,
  validateGetBrand,
  validateUpdateBrand,
  populateBrand
}
