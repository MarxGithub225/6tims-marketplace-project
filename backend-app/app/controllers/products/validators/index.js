const {validateCreateProduct} = require('./validateCreateProduct')
const {validateDeleteProduct} = require('./validateDeleteProduct')
const {validateGetProduct} = require('./validateGetProduct')
const {validateUpdateProduct} = require('./validateUpdateProduct')
const {populateProduct} = require('./populateProduct')

module.exports = {
  validateCreateProduct,
  validateDeleteProduct,
  validateGetProduct,
  validateUpdateProduct,
  populateProduct
}
