const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateNewsletter = [
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('suspended').exists().withMessage('MISSING').not().trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCreateNewsletter}
