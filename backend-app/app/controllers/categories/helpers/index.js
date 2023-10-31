const {createCategory2InDb} = require('./createCategory2InDb')
const {createCategory3InDb} = require('./createCategory3InDb')
const {updateCategoryClicksInDb} = require('./updateCategoryClicksInDb')
const {updateCategory2ClicksInDb} = require('./updateCategory2ClicksInDb')
const {updateCategory3ClicksInDb} = require('./updateCategory3ClicksInDb')

module.exports = {
  createCategory2InDb,
  createCategory3InDb,
  updateCategoryClicksInDb,
  updateCategory2ClicksInDb,
  updateCategory3ClicksInDb
}
