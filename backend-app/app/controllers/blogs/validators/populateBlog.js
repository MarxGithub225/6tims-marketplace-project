const populateBlog = [
  {
    path: 'createdUser'
  },
  {
    path: 'updatedUser'
  },
  {
    path: 'image'
  },
  {
    path: 'largeImage'
  },
  {
    path: 'comments.owner',
    populate: [
      {
        path: 'image'
      }
    ]
  },
  {
    path: 'likes.owner',
    populate: [
      {
        path: 'image'
      }
    ]
  }
]

module.exports = {populateBlog}
