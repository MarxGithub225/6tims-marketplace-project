const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreatePartner = [
  check('sellerId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('suspended')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCreatePartner}
