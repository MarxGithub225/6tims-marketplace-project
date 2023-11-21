const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Category2Schema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    iconId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      default: null
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      default: null
    },
    sizeGuide: {
      type: String
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
    },
    percent: {
      type: Number,
      default: 0
    },
    subCategory3Ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category3'
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

Category2Schema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
})

Category2Schema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

Category2Schema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

Category2Schema.virtual('icon', {
  ref: 'Image',
  localField: 'iconId',
  foreignField: '_id',
  justOne: true
})

Category2Schema.virtual('image', {
  ref: 'Image',
  localField: 'imageId',
  foreignField: '_id',
  justOne: true
})

Category2Schema.virtual('subCategories3', {
  ref: 'Category3',
  localField: 'subCategory3Ids',
  foreignField: '_id',
  justOne: false
})

Category2Schema.set('toObject', {virtuals: true})
Category2Schema.set('toJSON', {virtuals: true})

Category2Schema.plugin(mongoosePaginate)
module.exports = mongoose.model('Category2', Category2Schema)
