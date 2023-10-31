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
  getAllColors,
  createColor,
  getColor,
  updateColor,
  deleteColor
} = require('../controllers/colors')

const {
  validateCreateColor,
  validateGetColor,
  validateUpdateColor,
  validateDeleteColor
} = require('../controllers/colors/validators')

/*
 * Colors routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllColors)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllColors
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreateColor,
  createColor
)

/*
 * Get item route
 */
router.get('/:id', trimRequest.all, validateGetColor, getColor)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateColor,
  updateColor
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteColor,
  deleteColor
)

module.exports = router
