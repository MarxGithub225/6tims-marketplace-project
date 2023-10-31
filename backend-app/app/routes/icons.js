const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('user', {
  session: false
})
const {roleAuthorization} = require('../controllers/auth')

const {getAllIcons, createIcon, deleteIcon} = require('../controllers/icons')

const {iconResize, uploadPhoto} = require('../middleware/utils/resizeImage')

/*
 * Icons routes
 */

/*
 * Get all items route
 */
router.get('/', getAllIcons)

/*
 * Create items route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  uploadPhoto.single('icon'),
  iconResize,
  createIcon
)

router.delete(
  '/delete/:path/:id',
  requireAuth,
  roleAuthorization(['master', 'manager', 'user', 'moderator', 'delivery']),
  deleteIcon
)

module.exports = router
