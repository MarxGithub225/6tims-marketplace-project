const Newsletter = require('../../models/newsletter')
const {createItem, updateItem} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {emailExistsNewsletter} = require('../../middleware/emailer')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createNewsletter = async (req, res) => {
  try {
    req = matchedData(req)
    const doesEmailExists = await emailExistsNewsletter(req.email)
    if (!doesEmailExists) {
      res.status(201).json(await createItem({...req}, Newsletter, []))
    } else {
      const item = await Newsletter.findOne({
        email: req.email,
        suspended: true
      })
      if (item) {
        res.status(200).json(
          await updateItem(item._id, Newsletter, {
            email: req.email,
            suspended: false
          })
        )
      }
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createNewsletter}
