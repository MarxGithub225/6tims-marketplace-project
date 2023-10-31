const banner = require('../../../models/banner')
const {buildErrObject} = require('../../../middleware/utils')
const {populateBanner} = require('../validators')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const updateBannerClicksInDb = (id = '') => {
  return new Promise((resolve, reject) => {
    banner
      .findByIdAndUpdate(
        id,
        {
          $inc: {clicksNumber: 1}
        },
        {
          new: true
        },
        (err, items) => {
          if (err) {
            return reject(buildErrObject(422, err.message))
          }
          resolve(items)
        }
      )
      .populate(populateBanner)
  })
}

module.exports = {updateBannerClicksInDb}
