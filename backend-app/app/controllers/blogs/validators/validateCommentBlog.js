const {validateResult} = require('../../../middleware/utils')
const {check} = require('express-validator')

/**
 * Validates update item request
 */
const validateCommentBlog = [
  check('blogId')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('comment')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {validateCommentBlog}
