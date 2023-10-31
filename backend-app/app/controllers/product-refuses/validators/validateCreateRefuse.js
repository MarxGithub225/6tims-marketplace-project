const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateRefuse = [
  check('reason')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn([
      'wrong-content',
      'pornographic-images',
      'poor-quality-images',
      'misspellings'
    ])
    .withMessage('REFUSE_NOT_IN_KNOWN_ROLEREASON'),
  check('productId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('notes')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('ownerId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('validated').exists().withMessage('MISSING').not(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCreateRefuse}
