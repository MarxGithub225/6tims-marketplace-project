const Category = require('../../models/category')
const Category2 = require('../../models/category-2')
const Category3 = require('../../models/category-3')
const {checkQueryString, getItems} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {
  populateCategory1,
  populateCategory2,
  populateCategory3
} = require('./validators')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllCategories = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    if (req.query.published_only && req.query.published_only === 'true') {
      query = {
        ...query,
        suspended: false
      }
    } else if (
      req.query.published_only &&
      req.query.published_only === 'false'
    ) {
      query = {
        ...query,
        suspended: true
      }
    }
    res
      .status(200)
      .json(await getItems(req, Category, query, populateCategory1))
  } catch (error) {
    handleError(res, error)
  }
}

const getAllCategories2 = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    if (req.query.published_only && req.query.published_only === 'true') {
      query = {
        ...query,
        suspended: false
      }
    } else if (
      req.query.published_only &&
      req.query.published_only === 'false'
    ) {
      query = {
        ...query,
        suspended: true
      }
    }
    res
      .status(200)
      .json(await getItems(req, Category2, query, populateCategory2))
  } catch (error) {
    handleError(res, error)
  }
}

const getAllCategories3 = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    if (req.query.published_only && req.query.published_only === 'true') {
      query = {
        ...query,
        suspended: false
      }
    } else if (
      req.query.published_only &&
      req.query.published_only === 'false'
    ) {
      query = {
        ...query,
        suspended: true
      }
    }
    res
      .status(200)
      .json(await getItems(req, Category3, query, populateCategory3))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllCategories, getAllCategories2, getAllCategories3}
