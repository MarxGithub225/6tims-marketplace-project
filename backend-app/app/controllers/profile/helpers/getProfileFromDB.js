const User = require('../../../models/user')
const {itemNotFound} = require('../../../middleware/utils')

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = (id = '') => {
  return new Promise((resolve, reject) => {
    User.findById(id, async (err, user) => {
      try {
        await itemNotFound(err, user, 'NOT_FOUND')
        resolve(user)
      } catch (error) {
        reject(error)
      }
    }).populate([
      {
        path: 'createdUser'
      },
      {
        path: 'updatedUser'
      },
      {
        path: 'image'
      },
      {
        path: 'wishList'
      },
      {
        path: 'blogList'
      },
      {
        path: 'viewedList'
      }
    ])
  })
}

module.exports = {getProfileFromDB}
