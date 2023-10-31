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
  getAllBanners,
  createBanner,
  getBanner,
  updateBanner,
  deleteBanner,
  updateBannerClick
} = require('../controllers/banners')

const {
  validateCreateBanner,
  validateGetBanner,
  validateUpdateBanner,
  validateDeleteBanner
} = require('../controllers/banners/validators')

/*
 * Banners routes
 */
router.put('/click/:id', updateBannerClick)
/*
 * Get all items route
 */
router.get('/all', getAllBanners)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllBanners
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreateBanner,
  createBanner
)

/*
 * Get item route
 */
router.get('/:id', trimRequest.all, validateGetBanner, getBanner)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateBanner,
  updateBanner
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteBanner,
  deleteBanner
)

module.exports = router
