const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('user', {
  session: false
})
const trimRequest = require('trim-request')

const {roleAuthorization} = require('../controllers/auth')

const {
  getAllBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brands')

const {
  validateCreateBrand,
  validateGetBrand,
  validateUpdateBrand,
  validateDeleteBrand
} = require('../controllers/brands/validators')

/*
 * Brands routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllBrands)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllBrands
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreateBrand,
  createBrand
)

/*
 * Get item route
 */
router.get('/:id', trimRequest.all, validateGetBrand, getBrand)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateBrand,
  updateBrand
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteBrand,
  deleteBrand
)

module.exports = router
