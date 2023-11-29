const populateProduct = [
  {
    path: 'createdUser'
  },
  {
    path: 'updatedUser'
  },
  {
    path: 'category'
  },
  {
    path: 'category2'
  },
  {
    path: 'category3'
  },
  {
    path: 'refuse',
    populate: [
      {
        path: 'createdUser',
        populate: [
          {
            path: 'image'
          }
        ]
      }
    ]
  },
  {
    path: 'seller',
    populate: [
      {
        path: 'personnalInfo.image'
      }
    ]
  },
  {
    path: 'brand'
  },
  {
    path: 'color'
  },
  {
    path: 'images'
  },
  {
    path: 'historical.owner',
    populate: [
      {
        path: 'image'
      }
    ]
  },
  {
    path: 'ratings.owner',
    populate: [
      {
        path: 'image'
      }
    ]
  },
  {
    path: 'likes.owner'
  }
]

module.exports = {populateProduct}
