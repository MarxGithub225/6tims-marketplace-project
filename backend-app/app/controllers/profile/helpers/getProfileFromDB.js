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

module.exports = {getProfileFromDB}
