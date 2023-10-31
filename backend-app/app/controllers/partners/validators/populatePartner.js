const populatePartner = [
  {
    path: 'createdUser'
  },
  {
    path: 'updatedUser'
  },
  {
    path: 'seller',
    populate: {path: 'personnalInfo.image'}
  }
]

module.exports = {populatePartner}
