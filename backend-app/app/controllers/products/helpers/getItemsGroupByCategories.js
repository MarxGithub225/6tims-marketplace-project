const {buildErrObject} = require('../../../middleware/utils')

const {cleanPaginationID} = require('./cleanPaginationID')

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
const getItemsGroupByCategories = async (model = {}, query = {}) => {
  return new Promise((resolve, reject) => {
    model.aggregate(
      [
        {$match: query},
        {
          $group: {
            _id: '$category2Id',
            categoryId: {$addToSet: '$categoryId'},
            count: {$sum: 1}
          }
        },
        {
          $lookup: {
            from: 'category2',
            localField: '_id',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $lookup: {
            from: 'images',
            localField: 'category.imageId',
            foreignField: '_id',
            as: 'image'
          }
        },
        {
          $lookup: {
            from: 'images',
            localField: 'category.iconId',
            foreignField: '_id',
            as: 'icon'
          }
        },
        {
          $group: {
            _id: '$categoryId',
            data: {$push: '$$ROOT'}
          }
        },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $lookup: {
            from: 'images',
            localField: 'category.imageId',
            foreignField: '_id',
            as: 'image'
          }
        },
        {
          $lookup: {
            from: 'images',
            localField: 'category.iconId',
            foreignField: '_id',
            as: 'icon'
          }
        }
      ],
      (err, items) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        resolve(cleanPaginationID({docs: items}))
      }
    )
  })
}

module.exports = {getItemsGroupByCategories}
