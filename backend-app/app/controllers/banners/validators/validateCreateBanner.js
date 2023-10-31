const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateBanner = [
  check('link')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('imageId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('suspended').exists().withMessage('MISSING').not().trim(),
  check('startDate').exists().withMessage('MISSING').not().trim(),
  check('endDate').exists().withMessage('MISSING').not().trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCreateBanner}
