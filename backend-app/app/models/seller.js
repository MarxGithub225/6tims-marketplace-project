const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const SellerSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: true,
      select: false
    },
    personnalInfo: {
      fullName: {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        default: null
      },
      number: {
        type: String,
        required: true
      },
      identityCardType: {
        type: String,
        default: 'cni',
        enum: ['cni', 'passport', 'identity-certificate', 'resident-card'],
        required: true
      },
      identityCardNumber: {
        type: String,
        required: true
      },
      identityCardFileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        default: null,
        required: true
      }
    },
    locationInfo: {
      cityName: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      }
    },
    companyInfo: {
      companyName: {
        type: String,
        required: true
      },
      commercialRegister: {
        type: String,
        required: true
      },
      taxpayerAccountNumber: {
        type: String,
        required: true
      }
    },
    bankInfo: {
      rib: {
        type: String,
        required: true
      },
      bankName: {
        type: String,
        required: true
      },
      bankCode: {
        type: String,
        required: true
      },
      iban: {
        type: String,
        required: true
      },
      ownerFullName: {
        type: String,
        required: true
      },
      ribFileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        default: null,
        required: true
      }
    },
    verification: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    },
    cancellation: {
      note: {
        type: String
      },
      cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
      }
    },
    deleted: {
      type: Boolean,
      default: false
    },
    suspended: {
      type: Boolean,
      default: false
    },
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
    soldNumber: {
      type: Number,
      default: 0
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

SellerSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

SellerSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}

SellerSchema.virtual('personnalInfo.image', {
  ref: 'Image',
  localField: 'personnalInfo.imageId',
  foreignField: '_id',
  justOne: true
})

SellerSchema.virtual('personnalInfo.identityCardFile', {
  ref: 'Image',
  localField: 'personnalInfo.identityCardFileId',
  foreignField: '_id',
  justOne: true
})

SellerSchema.virtual('bankInfo.ribFile', {
  ref: 'Image',
  localField: 'bankInfo.ribFileId',
  foreignField: '_id',
  justOne: true
})

SellerSchema.virtual('cancellation.cancelledOwner', {
  ref: 'User',
  localField: 'cancellation.cancelledBy',
  foreignField: '_id',
  justOne: true
})

SellerSchema.set('toObject', {virtuals: true})
SellerSchema.set('toJSON', {virtuals: true})

SellerSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Seller', SellerSchema)
