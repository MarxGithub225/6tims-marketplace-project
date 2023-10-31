const {matchedData} = require('express-validator')
const {handleError, isIDGood} = require('../../middleware/utils')
const {
  updateCategoryClicksInDb,
  updateCategory2ClicksInDb,
  updateCategory3ClicksInDb
} = require('./helpers')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateCategoryClick = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(201).json(await updateCategoryClicksInDb(id))
  } catch (error) {
    handleError(res, error)
  }
}

const updateCategory2Click = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(201).json(await updateCategory2ClicksInDb(id))
  } catch (error) {
    handleError(res, error)
  }
}

const updateCategory3Click = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(201).json(await updateCategory3ClicksInDb(id))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {
  updateCategoryClick,
  updateCategory2Click,
  updateCategory3Click
}
