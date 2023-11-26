const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')
/**
 * Validates create new item request
 */
const validateCreateOrderDetails = [
  check('totalCost')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('sellerMoneyAmount')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('sellerId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('orderId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('status')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('items').exists().withMessage('MISSING').not(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCreateOrderDetails}
