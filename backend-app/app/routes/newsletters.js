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
  getAllNewsletters,
  createNewsletter,
  updateNewsletter
} = require('../controllers/newsletters')

const {
  validateUpdateNewsletter,
  validateCreateNewsletter
} = require('../controllers/newsletters/validators')

/*
 * Users routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllNewsletters
)

/*
 * Create new item route
 */
router.post('/', trimRequest.all, validateCreateNewsletter, createNewsletter)

/*
 * Update item route
 */
router.patch(
  '/:id',
  trimRequest.all,
  validateUpdateNewsletter,
  updateNewsletter
)

module.exports = router
