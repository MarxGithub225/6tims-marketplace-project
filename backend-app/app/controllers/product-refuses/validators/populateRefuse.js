const {populateProduct} = require('../../products/validators')

const populateRefuse = [
  {
    path: 'createdUser'
  },
  {
    path: 'updatedUser'
  },
  {
    path: 'product',
    populate: [...populateProduct]
  },
  {
    path: 'owner'
  }
]

module.exports = {populateRefuse}
