const {validateCreateBanner} = require('./validateCreateBanner')
const {validateDeleteBanner} = require('./validateDeleteBanner')
const {validateGetBanner} = require('./validateGetBanner')
const {validateUpdateBanner} = require('./validateUpdateBanner')
const {populateBanner} = require('./populateBanner')

module.exports = {
  validateCreateBanner,
  validateDeleteBanner,
  validateGetBanner,
  validateUpdateBanner,
  populateBanner
}
