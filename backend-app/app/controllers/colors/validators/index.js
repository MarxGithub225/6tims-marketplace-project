const {validateCreateColor} = require('./validateCreateColor')
const {validateDeleteColor} = require('./validateDeleteColor')
const {validateGetColor} = require('./validateGetColor')
const {validateUpdateColor} = require('./validateUpdateColor')
const {populateColor} = require('./populateColor')

module.exports = {
  validateCreateColor,
  validateDeleteColor,
  validateGetColor,
  validateUpdateColor,
  populateColor
}
