const Category = require('../../models/category')
const Category2 = require('../../models/category-2')
const Category3 = require('../../models/category-3')
const {updateItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {
  populateCategory1,
  populateCategory2,
  populateCategory3
} = require('./validators')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateCategory = async (req, res) => {
  try {
    const data = {
      updatedBy: req.user._id
    }
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res
      .status(200)
      .json(
        await updateItem(id, Category, {...req, ...data}, populateCategory1)
      )
  } catch (error) {
    handleError(res, error)
  }
}

const updateCategory2 = async (req, res) => {
  try {
    const data = {
      updatedBy: req.user._id
    }
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res
      .status(200)
      .json(
        await updateItem(id, Category2, {...req, ...data}, populateCategory2)
      )
  } catch (error) {
    handleError(res, error)
  }
}

const updateCategory3 = async (req, res) => {
  try {
    const data = {
      updatedBy: req.user._id
    }
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res
      .status(200)
      .json(
        await updateItem(id, Category3, {...req, ...data}, populateCategory3)
      )
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = {updateCategory, updateCategory2, updateCategory3}
