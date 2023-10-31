const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const {addDays} = require('date-fns')
const BannerSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      default: null
    },
    startDate: {
      type: Date,
      default: new Date()
    },
    endDate: {
      type: Date,
      default: addDays(new Date(), 7)
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
    },
    clicksNumber: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
BannerSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

BannerSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

BannerSchema.virtual('image', {
  ref: 'Image',
  localField: 'imageId',
  foreignField: '_id',
  justOne: true
})

BannerSchema.set('toObject', {virtuals: true})
BannerSchema.set('toJSON', {virtuals: true})

BannerSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Banner', BannerSchema)
