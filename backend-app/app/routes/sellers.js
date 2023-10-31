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
const {
  roleAuthorization: adminRoleAuthorization
} = require('../controllers/auth')

const {
  createSeller,
  deleteSeller,
  getAllSellers,
  getSeller,
  updateSeller,
  changePassword,
  forgotPassword,
  getRefreshToken,
  login,
  resetPassword,
  verify,
  cancelSeller,
  getProfile
} = require('../controllers/sellers')

const {
  validateCreateSeller,
  validateDeleteSeller,
  validateGetSeller,
  validateUpdateSeller,
  validateForgotPassword,
  validateLogin,
  validateResetPassword,
  validateVerify,
  validateChangePassword
} = require('../controllers/sellers/validators')

/*
 * Sellers routes
 */

/*
 * Get all items route
 */
router.get('/best', getAllSellers)

/*
 * Get items route
 */
router.get(
  '/',
  requireAdminAuth,
  adminRoleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllSellers
)

/*
 * Create new item route
 */
router.post('/', validateCreateSeller, createSeller)

/*
 * Get item route
 */
router.get('/id/:id', trimRequest.all, validateGetSeller, getSeller)

/*
 * Get item route
 */

router.get('/profile', requireAuth, trimRequest.all, getProfile)
/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  trimRequest.all,
  validateUpdateSeller,
  updateSeller
)

router.patch(
  '/admin/:id',
  requireAdminAuth,
  adminRoleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateSeller,
  updateSeller
)

/*
 * Delete item route
 */
router.patch(
  '/delete/:id',
  requireAdminAuth,
  adminRoleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteSeller,
  deleteSeller
)

router.patch(
  '/cancel/:id',
  requireAdminAuth,
  adminRoleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateVerify,
  cancelSeller
)

/*
 * Verify route
 */
router.post(
  '/verify/:id',
  requireAdminAuth,
  adminRoleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateVerify,
  verify
)

/*
 * Forgot password route
 */
router.post('/forgot', trimRequest.all, validateForgotPassword, forgotPassword)

/*
 * Reset password route
 */
router.post('/reset', trimRequest.all, validateResetPassword, resetPassword)

/*
 * Get new refresh token
 */
router.get('/token', requireAuth, trimRequest.all, getRefreshToken)

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)

router.post(
  '/changePassword',
  requireAuth,
  trimRequest.all,
  validateChangePassword,
  changePassword
)

module.exports = router
