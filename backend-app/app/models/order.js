const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const OrderSchema = new mongoose.Schema(
  {
    cost: {
      type: Number,
      required: true
    },
    fees: {
      type: Number,
      required: true
    },
    paidMethod: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: ''
    },
    shippingAddress: {
      phone: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      fullLocation: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      }
    },
    orderStatus: {
      type: String,
      default: 'pending',
      enum: [
        'pending',
        'accepting',
        'processing',
        'shipped',
        'cancelled',
        'delivered'
      ]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    historical: [
      {
        type: {
          type: String,
          default: 'view',
          enum: ['order', 'validation', 'shipping', 'delivery']
        },
        createdAt: {
          type: Date
        }
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

OrderSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

OrderSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

OrderSchema.set('toObject', {virtuals: true})
OrderSchema.set('toJSON', {virtuals: true})

OrderSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Order', OrderSchema)
