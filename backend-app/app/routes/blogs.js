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
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  likeBlog,
  commentBlog,
  updateBlogView,
  getRecentBlogs
} = require('../controllers/blogs')

const {
  validateCreateBlog,
  validateGetBlog,
  validateUpdateBlog,
  validateDeleteBlog,
  validateCommentBlog
} = require('../controllers/blogs/validators')

/*
 * Blogs routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllBlogs)
router.get('/all-recents/:id', getRecentBlogs)
/*
 * Like item route
 */
router.put('/like/:blogId', requireAuth, likeBlog)

/*
 * Comment item route
 */
router.patch(
  '/comment/:blogId',
  requireAuth,
  trimRequest.all,
  validateCommentBlog,
  commentBlog
)

/*
 * Update a view route
 */
router.put('/view/:blogId', updateBlogView)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  getAllBlogs
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateCreateBlog,
  createBlog
)

/*
 * Get item route
 */
router.get('/:id', trimRequest.all, validateGetBlog, getBlog)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateUpdateBlog,
  updateBlog
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  trimRequest.all,
  validateDeleteBlog,
  deleteBlog
)

module.exports = router
