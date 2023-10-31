const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const BrandSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    suspended: {
      type: Boolean,
      default: false
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

BrandSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

BrandSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

BrandSchema.set('toObject', {virtuals: true})
BrandSchema.set('toJSON', {virtuals: true})

BrandSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Brand', BrandSchema)
