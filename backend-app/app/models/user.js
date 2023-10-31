const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserSchema = new mongoose.Schema(
  {
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Icon',
      default: null
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    address: {
      phone: {
        type: String
      },
      city: {
        type: String
      },
      fullLocation: {
        type: String
      },
      zipCode: {
        type: String
      }
    },
    gender: {
      type: String,
      required: true,
      default: 'man',
      enum: ['man', 'woman']
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'master', 'manager', 'delivery', 'moderator'],
      default: 'user',
      required: true
    },
    wishListIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    blogListIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}],
    viewedListIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false
    },
    deleted: {
      type: Boolean,
      default: false
    },
    newsletterSubscribed: {
      type: Boolean,
      default: false
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

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}

UserSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

UserSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

UserSchema.virtual('image', {
  ref: 'Icon',
  localField: 'imageId',
  foreignField: '_id',
  justOne: true
})

UserSchema.virtual('wishList', {
  ref: 'Product',
  localField: 'wishListIds',
  foreignField: '_id',
  justOne: false
})

UserSchema.virtual('blogList', {
  ref: 'Blog',
  localField: 'blogListIds',
  foreignField: '_id',
  justOne: false
})

UserSchema.virtual('viewedList', {
  ref: 'Product',
  localField: 'viewedListIds',
  foreignField: '_id',
  justOne: false
})

UserSchema.set('toObject', {virtuals: true})
UserSchema.set('toJSON', {virtuals: true})

UserSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', UserSchema)
