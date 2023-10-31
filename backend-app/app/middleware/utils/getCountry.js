const axios = require('axios')
/**
 * Gets country from user using CloudFlare header 'cf-ipcountry'
 * @param {*} req - request object
 */
const getCountry = async () => {
  try {
    const apiResponse = await axios.get(
      `${process.env.GEO_URL}?apiKey=${process.env.GEO_API_KEY}`
    )
    return apiResponse.data
  } catch (e) {
    console.log('apiResponse.Error', e)
  }
}

module.exports = {getCountry}
