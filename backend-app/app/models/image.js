const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ImageSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

ImageSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

ImageSchema.set('toObject', {virtuals: true})
ImageSchema.set('toJSON', {virtuals: true})

ImageSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Image', ImageSchema)
