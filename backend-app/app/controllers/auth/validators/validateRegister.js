const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates register request
 */
const validateRegister = [
  check('firstName') 
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('lastName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('role')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(['user', 'master', 'manager', 'delivery', 'moderator'])
    .withMessage('USER_NOT_IN_KNOWN_ROLE'),
  check('gender')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(['man', 'woman'])
    .withMessage('USER_NOT_IN_KNOWN_GENDER'),
  check('imageId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('address.phone')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('address.city')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('address.fullLocation')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('address.zipCode').exists().withMessage('MISSING').not(),
  check('deleted').exists().withMessage('MISSING').not().trim(),
  check('suspended').exists().withMessage('MISSING').not().trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateRegister}
