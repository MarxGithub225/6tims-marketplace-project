const populateCategory1 = [
  {
    path: 'createdUser'
  },
  {
    path: 'updatedUser'
  },
  {
    path: 'icon'
  },
  {
    path: 'image'
  },
  {
    path: 'subCategories2',
    populate: {path: 'subCategories3'}
  },
  {
    path: 'subCategories3'
  }
]

const populateCategory2 = [
  {
    path: 'createdUser'
  },
  {
    path: 'updatedUser'
  },
  {
    path: 'icon'
  },
  {
    path: 'image'
  },
  {
    path: 'category'
  },
  {
    path: 'subCategories3'
  }
]

const populateCategory3 = [
  {
    path: 'createdUser'
  },
  {
    path: 'updatedUser'
  },
  {
    path: 'icon'
  },
  {
    path: 'image'
  },
  {
    path: 'category'
  },
  {
    path: 'category2'
  }
]
module.exports = {populateCategory1, populateCategory2, populateCategory3}
