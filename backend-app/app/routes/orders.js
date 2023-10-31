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
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder
} = require('../controllers/orders')

const {
  validateCreateOrder,
  validateGetOrder,
  validateUpdateOrder,
  validateDeleteOrder
} = require('../controllers/orders/validators')

/*
 * Orders routes
 */

/*
 * Get all items route
 */
router.get(
  '/all',
  requireAuth,
  roleAuthorization(['user', 'master', 'manager']),
  getAllOrders
)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllOrders
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateCreateOrder,
  createOrder
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['user', 'master', 'manager']),
  trimRequest.all,
  validateGetOrder,
  getOrder
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['user', 'master', 'manager']),
  trimRequest.all,
  validateUpdateOrder,
  updateOrder
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteOrder,
  deleteOrder
)

module.exports = router
