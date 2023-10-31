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
  getAllPartners,
  createPartner,
  getPartner,
  updatePartner,
  deletePartner,
  updateClick
} = require('../controllers/partners')

const {
  validateCreatePartner,
  validateGetPartner,
  validateUpdatePartner,
  validateDeletePartner
} = require('../controllers/partners/validators')

/*
 * Partners routes
 */
router.put('/click/:id', updateClick)
/*
 * Get all items route
 */
router.get('/all', getAllPartners)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllPartners
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreatePartner,
  createPartner
)

/*
 * Get item route
 */
router.get('/:id', trimRequest.all, validateGetPartner, getPartner)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdatePartner,
  updatePartner
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeletePartner,
  deletePartner
)

module.exports = router
