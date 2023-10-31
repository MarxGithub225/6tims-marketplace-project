const {matchedData} = require('express-validator')
const {handleError} = require('../../middleware/utils')
const {v4: uuidv4} = require('uuid')
const {
  emailExists,
  sendRegistrationEmailMessage
} = require('../../middleware/emailer')
const {createItemInDb} = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createUser = async (req, res) => {
  try {
    // extract firstName from req.body
    const {firstName: name} = req.body
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)
    const doesEmailExists = await emailExists(req.email)
    if (!doesEmailExists) {
      const item = await createItemInDb({
        ...req,
        firstName: name,
        password: uuidv4()
      })
      sendRegistrationEmailMessage(locale, item)
      res.status(201).json({...item, password: uuidv4()})
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createUser}
