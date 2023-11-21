const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const CategorySchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true
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
    subCategory2Ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category2'
      }
    ],
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

CategorySchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

CategorySchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

CategorySchema.virtual('icon', {
  ref: 'Image',
  localField: 'iconId',
  foreignField: '_id',
  justOne: true
})

CategorySchema.virtual('image', {
  ref: 'Image',
  localField: 'imageId',
  foreignField: '_id',
  justOne: true
})

CategorySchema.virtual('subCategories2', {
  ref: 'Category2',
  localField: 'subCategory2Ids',
  foreignField: '_id',
  justOne: false
})

CategorySchema.virtual('subCategories3', {
  ref: 'Category3',
  localField: 'subCategory3Ids',
  foreignField: '_id',
  justOne: false
})

CategorySchema.set('toObject', {virtuals: true})
CategorySchema.set('toJSON', {virtuals: true})

CategorySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Category', CategorySchema)
