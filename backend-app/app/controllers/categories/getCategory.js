const {matchedData} = require('express-validator')
const Category = require('../../models/category')
const Category2 = require('../../models/category-2')
const Category3 = require('../../models/category-3')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {
  populateCategory1,
  populateCategory2,
  populateCategory3
} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getCategory = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Category, populateCategory1))
  } catch (error) {
    handleError(res, error)
  }
}

const getCategory2 = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Category2, populateCategory2))
  } catch (error) {
    handleError(res, error)
  }
}

const getCategory3 = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Category3, populateCategory3))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getCategory, getCategory2, getCategory3}
