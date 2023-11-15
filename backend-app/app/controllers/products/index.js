const {createProduct} = require('./createProduct')
const {getAllProducts} = require('./getAllProducts')
const {getAllBestProducts} = require('./getAllBestProducts')
const {getRelativeProducts} = require('./getRelativeProducts')
const {getProduct} = require('./getProduct')
const {updateProduct} = require('./updateProduct')
const {likeProduct} = require('./likeProduct')
const {viewProduct} = require('./viewProduct')
const {commentProduct} = require('./commentProduct')
const {
  getAllProductsGroupByCategories
} = require('./getAllProductsGroupByCategories')

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  getAllBestProducts,
  getAllProductsGroupByCategories,
  updateProduct,
  likeProduct,
  viewProduct,
  commentProduct,
  getRelativeProducts
}
