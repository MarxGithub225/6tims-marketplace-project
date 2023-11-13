/* eslint-disable max-statements */
const Product = require('../../models/product')
const Brand = require('../../models/brand')
const {checkQueryString, getItems} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {populateProduct} = require('./validators')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllProducts = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    if (req.query.published_only && req.query.published_only === 'true') {
      query = {
        ...query,
        suspended: false
      }
    }

    if (req.query.published_only && req.query.published_only === 'false') {
      query = {
        ...query,
        suspended: true
      }
    }

    if (req.query.approved && req.query.approved === 'true') {
      query = {
        ...query,
        approved: true
      }
    }

    if (req.query.approved && req.query.approved === 'false') {
      query = {
        ...query,
        approved: false
      }
    }

    if (req.query.new && req.query.new === 'true') {
      query = {
        ...query,
        new: true
      }
    }

    if (req.query.new && req.query.new === 'false') {
      query = {
        ...query,
        new: false
      }
    }

    if (req.query.cancelled && req.query.cancelled === 'true') {
      query = {
        ...query,
        cancelled: true
      }
    }
    if (req.query.cancelled && req.query.cancelled === 'false') {
      query = {
        ...query,
        cancelled: false
      }
    }

    if (req.query.archived && req.query.archived === 'true') {
      query = {
        ...query,
        archived: true
      }
    }

    if (req.query.sellerId) {
      query = {
        ...query,
        sellerId: req.query.sellerId
      }
    }

    if (req.query.categoryId) {
      query = {
        ...query,
        categoryId: req.query.categoryId
      }
    }

    if (req.query.category2Id) {
      query = {
        ...query,
        category2Id: req.query.category2Id
      }
    }

    if (req.query.category3Id) {
      query = {
        ...query,
        category3Id: req.query.category3Id
      }
    }

    if (req.query.min && req.query.max) {
      query = {
        ...query,
        cost: {$gte: req.query.min, $lte: req.query.max}
      }
    }

    if (req.query.rating) {
      query = {
        ...query,
        totalrating: {$gte: req.query.rating}
      }
    }
    if (req.query.search) {
      const searchBrand = await Brand.find({
        label: {$regex: req.query.search}
      })
      query = {
        $and: [
          ...query,
          {
            $or: [
              ...query.$or,
              {brandId: searchBrand.length ? searchBrand[0]?._id : null},
              {
                title: {
                  $regex: new RegExp(query.search, 'i')
                }
              },
              {
                smallDescription: {
                  $regex: new RegExp(query.search, 'i')
                }
              },
              {
                description: {
                  $regex: new RegExp(query.search, 'i')
                }
              },
              {
                cost:
                  typeof req.query.search === 'number' ? req.query.search : -1
              },
              {
                promoCost:
                  typeof req.query.search === 'number' ? req.query.search : -1
              }
            ]
          }
        ]
      }
    }
    res.status(200).json(await getItems(req, Product, query, populateProduct))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllProducts}
