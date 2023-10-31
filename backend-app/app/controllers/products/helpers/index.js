const {getBestItems} = require('./getBestItems')
const {getItemsGroupByCategories} = require('./getItemsGroupByCategories')
const {likeProductInDb} = require('./likeProductInDb')
const {commentProductInDb} = require('./commentProductInDb')
const {updateProductsViewsInDb} = require('./updateProductsViewsInDb')
module.exports = {
  getBestItems,
  getItemsGroupByCategories,
  commentProductInDb,
  likeProductInDb,
  updateProductsViewsInDb
}
