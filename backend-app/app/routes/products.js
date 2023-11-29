const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('seller', {
  session: false
})
const requireAdminAuth = passport.authenticate('user', {
  session: false
})
const trimRequest = require('trim-request')

const {roleAuthorization} = require('../controllers/auth')

const {
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
} = require('../controllers/products')

const {
  validateCreateProduct,
  validateGetProduct,
  validateUpdateProduct
} = require('../controllers/products/validators')

/*
 * Products routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllProducts)

/*
 * Get items route
 */
router.get(
  '/',
  requireAdminAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllProducts
)

router.get('/seller', requireAuth, trimRequest.all, getAllProducts)

router.get('/best', getAllBestProducts)
router.get('/relative/:id', getRelativeProducts)

router.get('/categories', getAllProductsGroupByCategories)
router.put('/like/:productId', requireAdminAuth, likeProduct)
router.put('/view/:productId', viewProduct)
router.put('/view-auth/:productId', requireAdminAuth, viewProduct)
router.put('/comment/:productId', requireAdminAuth, commentProduct)

/*
 * Create new item route
 */
router.post(
  '/admin',
  requireAdminAuth,
  trimRequest.all,
  validateCreateProduct,
  createProduct
)

router.post(
  '/seller',
  requireAuth,
  trimRequest.all,
  validateCreateProduct,
  createProduct
)

/*
 * Get item route
 */
router.get('/id/:id', trimRequest.all, validateGetProduct, getProduct)

/*
 * Update item route
 */
router.patch(
  '/admin/:id',
  requireAdminAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateProduct,
  updateProduct
)

router.patch(
  '/seller/:id',
  requireAuth,
  trimRequest.all,
  validateUpdateProduct,
  updateProduct
)

module.exports = router
