const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('user', {
  session: false
})

const {roleAuthorization} = require('../controllers/auth')

const {createImage, deleteImage} = require('../controllers/images')
const {
  bannerImgResize,
  uploadPhoto,
  partnerImgResize,
  blogImgResize,
  productImgResize,
  uploadFile,
  iconResize,
  categoryImgResize
} = require('../middleware/utils/resizeImage')

router.post(
  '/banner',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  uploadPhoto.single('image'),
  bannerImgResize,
  createImage
)

router.post('/icon', uploadPhoto.single('image'), iconResize, createImage)

router.post(
  '/partner',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  uploadPhoto.single('image'),
  partnerImgResize,
  createImage
)

router.post(
  '/blog',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  uploadPhoto.single('image'),
  blogImgResize,
  createImage
)

router.post(
  '/category',
  requireAuth,
  roleAuthorization(['master', 'manager']),
  uploadPhoto.single('image'),
  categoryImgResize,
  createImage
)

router.post(
  '/product',
  uploadPhoto.single('image'),
  productImgResize,
  createImage
)

router.post('/file', uploadFile.single('file'), createImage)

router.delete('/delete/:folder/:path/:id', deleteImage)

module.exports = router
