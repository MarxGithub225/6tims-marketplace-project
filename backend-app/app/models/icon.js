const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const IconSchema = new mongoose.Schema(
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

IconSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

IconSchema.set('toObject', {virtuals: true})
IconSchema.set('toJSON', {virtuals: true})

IconSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Icon', IconSchema)
