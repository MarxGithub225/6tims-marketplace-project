const {buildErrObject} = require('../../../middleware/utils')

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = (req = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 5
      const options = {
        sort: {purchaseCount: -1, viewsCount: -1},
        lean: true,
        page,
        limit
      }
      resolve(options)
    } catch (error) {
      console.log(error.message)
      reject(buildErrObject(422, 'ERROR_WITH_INIT_OPTIONS'))
    }
  })
}

module.exports = {listInitOptions}
