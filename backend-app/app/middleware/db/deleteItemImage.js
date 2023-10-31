const {buildSuccObject, itemNotFound} = require('../../middleware/utils')
const model = require('../../models/image')
const fs = require('fs')
/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 */
const deleteItemImage = (id = '', folder = '', path = '') => {
  return new Promise((resolve, reject) => {
    model.findByIdAndRemove(id, async (err, item) => {
      try {
        fs.unlinkSync('public/files/' + `${folder}/${path}`)
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(buildSuccObject('DELETED'))
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {deleteItemImage}
