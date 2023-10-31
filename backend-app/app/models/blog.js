const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      default: null
    },
    largeImageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      default: null
    },
    videoUrl: {
      type: String,
      maxLength: 255
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    comments: [
      {
        comment: String,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        postedAt: Date
      }
    ],
    likes: [
      {
        likedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        likedAt: Date
      }
    ],
    isVideo: {
      type: Boolean,
      default: false
    },
    videoDuration: {
      type: Number,
      default: 0
    },
    readDuration: {
      type: Number,
      default: 0
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

BlogSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

BlogSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

BlogSchema.virtual('image', {
  ref: 'Image',
  localField: 'imageId',
  foreignField: '_id',
  justOne: true
})

BlogSchema.virtual('largeImage', {
  ref: 'Image',
  localField: 'largeImageId',
  foreignField: '_id',
  justOne: true
})

BlogSchema.virtual('comments.owner', {
  ref: 'User',
  localField: 'comments.postedBy',
  foreignField: '_id',
  justOne: true
})

BlogSchema.virtual('likes.owner', {
  ref: 'User',
  localField: 'likes.likedBy',
  foreignField: '_id',
  justOne: true
})

BlogSchema.set('toObject', {virtuals: true})
BlogSchema.set('toJSON', {virtuals: true})

BlogSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Blog', BlogSchema)
