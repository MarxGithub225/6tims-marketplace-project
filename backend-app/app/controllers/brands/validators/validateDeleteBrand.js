const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates delete item request
 */
const validateDeleteBrand = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateDeleteBrand}
