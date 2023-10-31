const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PartnerSchema = new mongoose.Schema(
  {
    suspended: {
      type: Boolean,
      default: false
    },
    clicksNumber: {
      type: Number,
      default: 0
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      unique: true
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

PartnerSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

PartnerSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

PartnerSchema.virtual('seller', {
  ref: 'Seller',
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true
})

PartnerSchema.set('toObject', {virtuals: true})
PartnerSchema.set('toJSON', {virtuals: true})

PartnerSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Partner', PartnerSchema)
