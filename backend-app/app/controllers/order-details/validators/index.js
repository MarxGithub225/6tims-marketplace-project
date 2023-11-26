const {validateCreateOrderDetails} = require('./validateCreateOrderDetails')
const {validateDeleteOrderDetails} = require('./validateDeleteOrderDetails')
const {validateGetOrderDetails} = require('./validateGetOrderDetails')
const {validateUpdateOrderDetails} = require('./validateUpdateOrderDetails')
const {populateOrderDetails} = require('./populateOrderDetails')

module.exports = {
  validateCreateOrderDetails,
  validateDeleteOrderDetails,
  validateGetOrderDetails,
  validateUpdateOrderDetails,
  populateOrderDetails
}
