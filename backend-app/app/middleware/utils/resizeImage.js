const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const {handleError} = require('./handleError')
const {buildErrObject} = require('./buildErrObject')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const filesPath = '../../../public/files'
    fs.mkdirSync(filesPath, {recursive: true})
    cb(null, path.join(__dirname, '../../../public/files/'))
  },
  filename(req, file, cb) {
    const uniquesuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${file.fieldname}-${uniquesuffix}.png`)
  }
})

const fileStorage = multer.diskStorage({
  destination(req, file, cb) {
    const filesPath = '../../../public/files'
    fs.mkdirSync(filesPath, {recursive: true})

    cb(null, path.join(__dirname, filesPath))
  },
  filename(req, file, cb) {
    const uniquesuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = file.mimetype.split('/')[1]
    cb(null, `${file.fieldname}-${uniquesuffix}.${ext}`)
  }
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    return cb(null, true)
  } else {
    return cb({message: 'Unsupported file format'}, false)
  }
}

const uploadPhoto = multer({
  storage,
  fileFilter: multerFilter,
  limits: {fileSize: 1000000}
})

const uploadFile = multer({
  storage: fileStorage,
  limits: {fileSize: 1000000}
})

const bannerImgResize = async (req, res, next) => {
  try {
    if (!req.file) {
      return handleError(res, buildErrObject(422, 'FILE_NOT_EXIST'))
    }
    const filesPath = '../../../public/files/banners'
    fs.mkdirSync(filesPath, {recursive: true})
    await sharp(req.file.path)
      .resize(554, 513)
      .toFormat('png')
      .png({quality: 90})
      .toFile(`public/files/banners/${req.file.filename}`)
    fs.unlinkSync(`public/files/${req.file.filename}`)
    return next()
  } catch (error) {
    handleError(res, error.message)
  }
}

const partnerImgResize = async (req, res, next) => {
  try {
    if (!req.file) {
      return handleError(res, buildErrObject(422, 'FILE_NOT_EXIST'))
    }
    const filesPath = '../../../public/files/partners'
    fs.mkdirSync(filesPath, {recursive: true})
    await sharp(req.file.path)
      .resize(60, 60)
      .toFormat('png')
      .png({quality: 90})
      .toFile(`public/files/partners/${req.file.filename}`)
    fs.unlinkSync(`public/files/${req.file.filename}`)
    return next()
  } catch (error) {
    handleError(res, error.message)
  }
}

const blogImgResize = async (req, res, next) => {
  try {
    if (!req.file) {
      return handleError(res, buildErrObject(422, 'FILE_NOT_EXIST'))
    }
    const filesPath = '../../../public/files/blogs'
    fs.mkdirSync(filesPath, {recursive: true})
    const size = !req.body.isLarge ? [402, 280] : [990, 574]
    await sharp(req.file.path)
      .resize(size[0], size[1])
      .toFormat('png')
      .png({quality: 90})
      .toFile(`public/files/blogs/${req.file.filename}`)
    fs.unlinkSync(`public/files/${req.file.filename}`)
    return next()
  } catch (error) {
    handleError(res, error.message)
  }
}

const categoryImgResize = async (req, res, next) => {
  try {
    if (!req.file) {
      return handleError(res, buildErrObject(422, 'FILE_NOT_EXIST'))
    }
    const filesPath = '../../../public/files/categories'
    fs.mkdirSync(filesPath, {recursive: true})
    await sharp(req.file.path)
      .resize(512, 512)
      .toFormat('png')
      .png({quality: 90})
      .toFile(`public/files/categories/${req.file.filename}`)
    fs.unlinkSync(`public/files/${req.file.filename}`)
    return next()
  } catch (error) {
    handleError(res, error.message)
  }
}

const iconResize = async (req, res, next) => {
  try {
    if (!req.file) {
      return handleError(res, buildErrObject(422, 'FILE_NOT_EXIST'))
    }
    const filesPath = '../../../public/files/icons'
    fs.mkdirSync(filesPath, {recursive: true})
    await sharp(req.file.path)
      .resize(512, 512)
      .toFormat('png')
      .png({quality: 90})
      .toFile(`public/files/icons/${req.file.filename}`)
    fs.unlinkSync(`public/files/${req.file.filename}`)
    return next()
  } catch (error) {
    handleError(res, error.message)
  }
}

const productImgResize = async (req, res, next) => {
  try {
    if (!req.file) {
      return handleError(res, buildErrObject(422, 'FILE_NOT_EXIST'))
    }
    const filesPath = '../../../public/files/products'
    fs.mkdirSync(filesPath, {recursive: true})
    await sharp(req.file.path)
      .resize(512, 512)
      .toFormat('png')
      .png({quality: 90})
      .toFile(`public/files/products/${req.file.filename}`)
    fs.unlinkSync(`public/files/${req.file.filename}`)
    return next()
  } catch (error) {
    handleError(res, error.message)
  }
}

module.exports = {
  uploadPhoto,
  productImgResize,
  bannerImgResize,
  partnerImgResize,
  categoryImgResize,
  uploadFile,
  blogImgResize,
  iconResize
}
