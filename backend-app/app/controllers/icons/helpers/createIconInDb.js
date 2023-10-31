const Icon = require('../../../models/icon')
const {buildErrObject} = require('../../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createIconInDb = ({file = ''}) => {
  return new Promise((resolve, reject) => {
    const image = new Icon({path: file})
    image.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = {createIconInDb}
