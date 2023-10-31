const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Category3Schema = new mongoose.Schema(
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
    category2Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category2',
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
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
Category3Schema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

Category3Schema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

Category3Schema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
})

Category3Schema.virtual('category2', {
  ref: 'Category2',
  localField: 'category2Id',
  foreignField: '_id',
  justOne: true
})

Category3Schema.virtual('icon', {
  ref: 'Image',
  localField: 'iconId',
  foreignField: '_id',
  justOne: true
})

Category3Schema.virtual('image', {
  ref: 'Image',
  localField: 'imageId',
  foreignField: '_id',
  justOne: true
})

Category3Schema.set('toObject', {virtuals: true})
Category3Schema.set('toJSON', {virtuals: true})

Category3Schema.plugin(mongoosePaginate)
module.exports = mongoose.model('Category3', Category3Schema)
