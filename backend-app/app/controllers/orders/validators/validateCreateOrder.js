const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')
/**
 * Validates create new item request
 */
const validateCreateOrder = [
  check('cost')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('fees').exists().withMessage('MISSING').not(),
  check('paidMethod')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('products')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('shippingAddress.phone')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('shippingAddress.city')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('shippingAddress.state').exists().withMessage('MISSING').not(),
  check('shippingAddress.fullLocation')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('shippingAddress.zipCode')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('orderStatus')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn([
      'pending',
      'accepting',
      'processing',
      'shipped',
      'cancelled',
      'delivered'
    ])
    .withMessage('ORDER_NOT_IN_KNOWN_STATUS'),
  check('orderDetails')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCreateOrder}
