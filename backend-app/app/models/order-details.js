const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const OrderSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller'
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    items: [
      {
        bonusNumber: {
          type: Number,
          default: 0
        },
        boughtNumber: {
          type: Number,
          default: 0
        },
        colorId: {
          type: String
        },
        image: {
          type: String
        },
        initialProduct: {
          type: Object
        },
        isBonus: {
          type: Boolean,
          default: 0
        },
        oldPrice: {
          type: Number,
          default: 0
        },
        percentage: {
          type: Number,
          default: 0
        },
        price: {
          type: Number,
          default: 0
        },
        promo: {
          type: Boolean,
          default: 0
        },
        sellerId: {
          type: String
        },
        slug: {
          type: String
        },
        title: {
          type: String
        },
        totalPrice: {
          type: Number,
          default: 0
        },
        totalQty: {
          type: Number,
          default: 0
        },
        variables: [
          {
            label: {
              type: String
            },
            quantity: {
              type: Number,
              default: 0
            },
            sku: {
              type: String
            }
          }
        ]
      }
    ],
    totalCost: {
      type: Number,
      default: 0,
      required: true
    },
    sellerMoneyAmount: {
      type: Number,
      default: 0,
      required: true
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'paid', 'cancelled']
    },
    paidAt: {
      type: Date,
      default: null
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

OrderSchema.virtual('seller', {
  ref: 'Seller',
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true
})

OrderSchema.virtual('order', {
  ref: 'Order',
  localField: 'orderId',
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
module.exports = mongoose.model('OrderDetails', OrderSchema)
