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
  getAllCategories,
  getAllCategories2,
  getAllCategories3,
  createCategory,
  createCategory2,
  createCategory3,
  getCategory,
  getCategory2,
  getCategory3,
  updateCategory,
  updateCategory2,
  updateCategory3,
  deleteCategory,
  deleteCategory2,
  deleteCategory3,
  updateCategoryClick,
  updateCategory2Click,
  updateCategory3Click
} = require('../controllers/categories')

const {
  validateCreateCategory,
  validateCreateCategory2,
  validateCreateCategory3,
  validateDeleteCategory,
  validateGetCategory,
  validateUpdateCategory,
  validateUpdateCategory2,
  validateUpdateCategory3
} = require('../controllers/categories/validators')

/*
 * Banners routes
 */
router.put('/click/:id', updateCategoryClick)
router.put('/click-sub/:id', updateCategory2Click)
router.put('/click-sub-2/:id', updateCategory3Click)
/*
 * Get all items route
 */
router.get('/all', getAllCategories)
router.get('/all-sub', getAllCategories2)
router.get('/all-sub-2', getAllCategories3)

/*
 * Get items route
 */
router.get(
  '/admin',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllCategories
)
router.get(
  '/admin-sub',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllCategories2
)
router.get(
  '/admin-sub2',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllCategories3
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreateCategory,
  createCategory
)
router.post(
  '/sub',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreateCategory2,
  createCategory2
)
router.post(
  '/sub-2',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreateCategory3,
  createCategory3
)

/*
 * Get item route
 */
router.get('/category/:id', trimRequest.all, validateGetCategory, getCategory)
router.get(
  '/sub-category/:id',
  trimRequest.all,
  validateGetCategory,
  getCategory2
)
router.get(
  '/sub-category-2/:id',
  trimRequest.all,
  validateGetCategory,
  getCategory3
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateCategory,
  updateCategory
)

router.patch(
  '/sub/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateCategory2,
  updateCategory2
)

router.patch(
  '/sub-2/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateCategory3,
  updateCategory3
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteCategory,
  deleteCategory
)

router.delete(
  '/sub/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteCategory,
  deleteCategory2
)

router.delete(
  '/sub-2/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteCategory,
  deleteCategory3
)

module.exports = router
