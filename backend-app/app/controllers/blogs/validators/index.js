const {validateCreateBlog} = require('./validateCreateBlog')
const {validateDeleteBlog} = require('./validateDeleteBlog')
const {validateGetBlog} = require('./validateGetBlog')
const {validateUpdateBlog} = require('./validateUpdateBlog')
const {populateBlog} = require('./populateBlog')

module.exports = {
  validateCreateBlog,
  validateDeleteBlog,
  validateGetBlog,
  validateUpdateBlog,
  populateBlog
}
