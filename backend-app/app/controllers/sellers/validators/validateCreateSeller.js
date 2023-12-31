const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateSeller = [
  check('personnalInfo.firstName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('personnalInfo.lastName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('personnalInfo.imageId').exists().withMessage('MISSING').not(),
  check('personnalInfo.number')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('personnalInfo.identityCardType')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(['cni', 'passport', 'identity-certificate', 'resident-card'])
    .withMessage('ID_TYPE_NOT_IN_KNOWN_TYPE'),
  check('personnalInfo.identityCardNumber')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('personnalInfo.identityCardFileId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('locationInfo.cityName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('locationInfo.postalCode')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('companyInfo.companyName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('companyInfo.commercialRegister')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('companyInfo.taxpayerAccountNumber')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('bankInfo.rib')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('bankInfo.bankName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('bankInfo.ribFileId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('bankInfo.bankCode')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('bankInfo.iban')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('bankInfo.ownerFullName')
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
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 6
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_6'),
  check('deleted').exists().withMessage('MISSING').not().trim(),
  check('suspended').exists().withMessage('MISSING').not().trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCreateSeller}
