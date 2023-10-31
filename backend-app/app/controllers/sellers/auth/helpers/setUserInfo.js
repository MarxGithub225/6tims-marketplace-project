/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    const user = {
      _id: req._id,
      imageId: req.personnalInfo.imageId,
      image: req.image,
      firstName: req.personnalInfo.firstName,
      lastName: req.personnalInfo.lastName,
      fullName: req.personnalInfo.fullName,
      number: req.personnalInfo.number,
      email: req.email
    }
    resolve(user)
  })
}

module.exports = {setUserInfo}
