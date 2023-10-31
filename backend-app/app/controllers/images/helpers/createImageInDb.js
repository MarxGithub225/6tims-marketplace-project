const Image = require('../../../models/image')
const {buildErrObject} = require('../../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createImageInDb = ({file = '', createdBy = ''}) => {
  return new Promise((resolve, reject) => {
    const image = new Image({path: file, createdBy})
    image.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = {createImageInDb}
