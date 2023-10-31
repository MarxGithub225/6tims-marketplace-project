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
    path: 'seller'
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
    path: 'historical.owner'
  },
  {
    path: 'ratings.owner'
  },
  {
    path: 'likes.owner'
  }
]

module.exports = {populateProduct}
