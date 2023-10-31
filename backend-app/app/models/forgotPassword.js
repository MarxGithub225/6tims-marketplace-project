const mongoose = require('mongoose')
const validator = require('validator')

const ForgotPasswordSchema = new mongoose.Schema(
  {
    userTyoe: {
      type: String,
      enum: ['user', 'seller', 'admin'],
      default: 'user',
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      required: true
    },
    verification: {
      type: String
    },
    used: {
      type: Boolean,
      default: false
    },
    browserRequest: {
      type: String
    },
    browserChanged: {
      type: String
    },
    addressRequest: {
      type: Object,
      required: true
    },
    addressChanged: {
      type: Object,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
module.exports = mongoose.model('ForgotPassword', ForgotPasswordSchema)
