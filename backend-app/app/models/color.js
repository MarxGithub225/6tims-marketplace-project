const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ColorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 255
    },
    code: {
      type: String,
      maxLength: 255
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

ColorSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

ColorSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

ColorSchema.set('toObject', {virtuals: true})
ColorSchema.set('toJSON', {virtuals: true})

ColorSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Color', ColorSchema)
