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
      req,
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
        path: 'wishList',
        populate: [
          {
            path: 'createdUser'
          },
          {
            path: 'updatedUser'
          },
          {
            path: 'category'
          },
          {
            path: 'category2'
          },
          {
            path: 'category3'
          },
          {
            path: 'refuse',
            populate: [
              {
                path: 'createdUser',
                populate: [
                  {
                    path: 'image'
                  }
                ]
              }
            ]
          },
          {
            path: 'seller',
            populate: [
              {
                path: 'personnalInfo.image'
              }
            ]
          },
          {
            path: 'brand'
          },
          {
            path: 'color'
          },
          {
            path: 'images'
          },
          {
            path: 'historical.owner',
            populate: [
              {
                path: 'image'
              }
            ]
          },
          {
            path: 'ratings.owner',
            populate: [
              {
                path: 'image'
              }
            ]
          },
          {
            path: 'likes.owner'
          }
        ]
      },
      {
        path: 'blogList',
        populate: [
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
            path: 'largeImage'
          },
          {
            path: 'comments.owner'
          },
          {
            path: 'likes.owner'
          }
        ]
      },
      {
        path: 'viewedList',
        populate: [
          {
            path: 'createdUser'
          },
          {
            path: 'updatedUser'
          },
          {
            path: 'category'
          },
          {
            path: 'category2'
          },
          {
            path: 'category3'
          },
          {
            path: 'refuse',
            populate: [
              {
                path: 'createdUser',
                populate: [
                  {
                    path: 'image'
                  }
                ]
              }
            ]
          },
          {
            path: 'seller',
            populate: [
              {
                path: 'personnalInfo.image'
              }
            ]
          },
          {
            path: 'brand'
          },
          {
            path: 'color'
          },
          {
            path: 'images'
          },
          {
            path: 'historical.owner',
            populate: [
              {
                path: 'image'
              }
            ]
          },
          {
            path: 'ratings.owner',
            populate: [
              {
                path: 'image'
              }
            ]
          },
          {
            path: 'likes.owner'
          }
        ]
      }
    ])
  })
}

module.exports = {updateProfileInDB}
