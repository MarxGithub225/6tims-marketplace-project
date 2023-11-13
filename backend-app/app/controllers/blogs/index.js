const {createBlog} = require('./createBlog')
const {deleteBlog} = require('./deleteBlog')
const {getAllBlogs} = require('./getAllBlogs')
const {getBlog} = require('./getBlog')
const {updateBlog} = require('./updateBlog')
const {likeBlog} = require('./likeBlog')
const {commentBlog} = require('./commentBlog')
const {updateBlogView} = require('./updateBlogView')
const {getRecentBlogs} = require('./getRecentBlogs')

module.exports = {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  likeBlog,
  commentBlog,
  updateBlogView,
  getRecentBlogs
}
