const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateBlog = [
  check('title')
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
  check('largeImageId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('description')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('videoUrl').exists().withMessage('MISSING').not().trim(),
  check('isVideo').exists().withMessage('MISSING').not().trim(),
  check('videoDuration').exists().withMessage('MISSING').not().trim(),
  check('readDuration').exists().withMessage('MISSING').not().trim(),
  check('suspended').exists().withMessage('MISSING').not().trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCreateBlog}
