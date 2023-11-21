const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates update item request
 */
const validateUpdateCategory = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('iconId').exists().withMessage('MISSING').not(),
  check('imageId').exists().withMessage('MISSING').not(),
  check('percent').exists().withMessage('MISSING').not(),
  check('suspended')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('sizeGuide')
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

const validateUpdateCategory2 = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('iconId').exists().withMessage('MISSING').not(),
  check('imageId').exists().withMessage('MISSING').not(),
  check('percent').exists().withMessage('MISSING').not(),
  check('categoryId')
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
  check('sizeGuide')
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

const validateUpdateCategory3 = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('iconId').exists().withMessage('MISSING').not(),
  check('imageId').exists().withMessage('MISSING').not(),
  check('percent').exists().withMessage('MISSING').not(),
  check('categoryId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('category2Id')
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
  check('sizeGuide')
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

module.exports = {
  validateUpdateCategory,
  validateUpdateCategory2,
  validateUpdateCategory3
}
