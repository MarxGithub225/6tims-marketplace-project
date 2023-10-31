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
  getAllRefuses,
  createRefuse,
  getRefuse,
  updateRefuse,
  deleteRefuse
} = require('../controllers/product-refuses')

const {
  validateCreateRefuse,
  validateGetRefuse,
  validateUpdateRefuse,
  validateDeleteRefuse
} = require('../controllers/product-refuses/validators')

/*
 * Refuses routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllRefuses)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllRefuses
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreateRefuse,
  createRefuse
)

/*
 * Get item route
 */
router.get('/:id', trimRequest.all, validateGetRefuse, getRefuse)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateRefuse,
  updateRefuse
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteRefuse,
  deleteRefuse
)

module.exports = router
