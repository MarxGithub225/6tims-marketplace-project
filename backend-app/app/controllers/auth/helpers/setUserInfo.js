/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    const user = {
      _id: req._id,
      imageId: req.imageId,
      image: req.image,
      firstName: req.firstName,
      lastName: req.lastName,
      fullName: req.fullName,
      email: req.email,
      gender: req.gender,
      role: req.role
    }
    resolve(user)
  })
}

module.exports = {setUserInfo}
