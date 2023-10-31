const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateProduct = [
  check('categoryId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('category2Id').exists().withMessage('MISSING').not(),
  check('category3Id').exists().withMessage('MISSING').not(),
  check('brandId').exists().withMessage('MISSING').not(),
  check('model').exists().withMessage('MISSING').not(),
  check('weight').exists().withMessage('MISSING').not(),
  check('weight').exists().withMessage('MISSING').not(),
  check('promoCost').exists().withMessage('MISSING').not(),
  check('boughtNumber').exists().withMessage('MISSING').not(),
  check('bonusNumber').exists().withMessage('MISSING').not(),
  check('promostartDate').exists().withMessage('MISSING').not(),
  check('promoType').exists().withMessage('MISSING').not(),
  check('promoendDate').exists().withMessage('MISSING').not(),
  check('isPromoted').exists().withMessage('MISSING').not(),
  check('colorId').exists().withMessage('MISSING').not(),
  check('principalFeatures').exists().withMessage('MISSING').not(),
  check('suspended').exists().withMessage('MISSING').not(),
  check('new').exists().withMessage('MISSING').not(),
  check('updated').exists().withMessage('MISSING').not(),
  check('approved').exists().withMessage('MISSING').not(),
  check('cancelled').exists().withMessage('MISSING').not(),
  check('archived').exists().withMessage('MISSING').not(),
  check('mainImage').exists().withMessage('MISSING').not(),
  check('sellerId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('title')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('cost')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('variables')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('imageIds')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('smallDescription')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('fullDescription')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
module.exports = {validateCreateProduct}
