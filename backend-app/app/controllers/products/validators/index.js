const {validateCreateProduct} = require('./validateCreateProduct')
const {validateDeleteProduct} = require('./validateDeleteProduct')
const {validateGetProduct} = require('./validateGetProduct')
const {validateUpdateProduct} = require('./validateUpdateProduct')
const {populateProduct} = require('./populateProduct')
const {validateCommentProduct} = require('./validateCommentProduct')

module.exports = {
  validateCreateProduct,
  validateDeleteProduct,
  validateGetProduct,
  validateUpdateProduct,
  populateProduct,
  validateCommentProduct
}
