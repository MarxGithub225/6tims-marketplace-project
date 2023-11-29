const User = require('../../../models/user')
const {itemNotFound} = require('../../../middleware/utils')

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = (req = {}, id = '') => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      id,
      {...req, fullName: `${req.firstName} ${req.lastName}`},
      {
        new: true,
        runValidators: true,
        select: '-role -_id -updatedAt -createdAt'
      },
      async (err, user) => {
        try {
          await itemNotFound(err, user, 'NOT_FOUND')
          resolve(user)
        } catch (error) {
          reject(error)
        }
      }
    ).populate([
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

module.exports = {updateProfileInDB}
