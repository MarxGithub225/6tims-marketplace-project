const {validateCreateOrder} = require('./validateCreateOrder')
const {validateDeleteOrder} = require('./validateDeleteOrder')
const {validateGetOrder} = require('./validateGetOrder')
const {validateUpdateOrder} = require('./validateUpdateOrder')
const {populateOrder} = require('./populateOrder')

module.exports = {
  validateCreateOrder,
  validateDeleteOrder,
  validateGetOrder,
  validateUpdateOrder,
  populateOrder
}
