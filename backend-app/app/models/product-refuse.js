const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const RefuseSchema = new mongoose.Schema(
  {
    reason: {
      type: [String],
      enum: [
        'wrong-content',
        'pornographic-images',
        'poor-quality-images',
        'misspellings'
      ],
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true
    },
    notes: {
      type: String
    },
    validated: {
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

RefuseSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

RefuseSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

RefuseSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true
})

RefuseSchema.virtual('owner', {
  ref: 'Seller',
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true
})

RefuseSchema.set('toObject', {virtuals: true})
RefuseSchema.set('toJSON', {virtuals: true})

RefuseSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Refuse', RefuseSchema)
