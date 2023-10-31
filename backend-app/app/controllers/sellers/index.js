const {createSeller} = require('./createSeller')
const {deleteSeller} = require('./deleteSeller')
const {getAllSellers} = require('./getAllSellers')
const {getSeller} = require('./getSeller')
const {updateSeller} = require('./updateSeller')
const {changePassword} = require('./profile')
const {cancelSeller} = require('./cancelSeller')
const {forgotPassword} = require('./auth')
const {getRefreshToken} = require('./auth')
const {login} = require('./auth')
const {resetPassword} = require('./auth')
const {verify} = require('./auth')
const {getProfile} = require('./getProfile')
module.exports = {
  createSeller,
  deleteSeller,
  getAllSellers,
  getSeller,
  updateSeller,
  changePassword,
  forgotPassword,
  getRefreshToken,
  login,
  resetPassword,
  verify,
  cancelSeller,
  getProfile
}
