const Category = require('../../models/category')
const {createItem} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {populateCategory1} = require('./validators')
const {createCategory2InDb, createCategory3InDb} = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createCategory = async (req, res) => {
  try {
    const data = {
      createdBy: req.user._id,
      updatedBy: req.user._id
    }
    req = matchedData(req)
    res
      .status(201)
      .json(await createItem({...req, ...data}, Category, populateCategory1))
  } catch (error) {
    handleError(res, error)
  }
}

const createCategory2 = async (req, res) => {
  try {
    const data = {
      createdBy: req.user._id,
      updatedBy: req.user._id
    }
    req = matchedData(req)
    res.status(201).json(await createCategory2InDb({...req, ...data}))
  } catch (error) {
    handleError(res, error)
  }
}

const createCategory3 = async (req, res) => {
  try {
    const data = {
      createdBy: req.user._id,
      updatedBy: req.user._id
    }
    req = matchedData(req)
    res.status(201).json(await createCategory3InDb({...req, ...data}))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createCategory, createCategory2, createCategory3}
