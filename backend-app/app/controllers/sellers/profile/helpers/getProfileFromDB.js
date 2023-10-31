const Seller = require('../../../../models/seller')
const {itemNotFound} = require('../../../../middleware/utils')

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = (id = '') => {
  return new Promise((resolve, reject) => {
    Seller.findById(id, async (err, user) => {
      try {
        await itemNotFound(err, user, 'NOT_FOUND')
        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {getProfileFromDB}
