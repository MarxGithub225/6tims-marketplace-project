const populateOrderDetails = [
  {
    path: 'seller',
    populate: [
      {
        path: 'personnalInfo.image'
      },
      {
        path: 'personnalInfo.identityCardFile'
      },
      {
        path: 'bankInfo.ribFile'
      },
      {
        path: 'cancellation.cancelledOwner'
      }
    ]
  },
  {
    path: 'order',
    populate: [
      {
        path: 'createdUser'
      },
      {
        path: 'updatedUser'
      }
    ]
  },
  {
    path: 'updatedUser'
  }
]

module.exports = {populateOrderDetails}
