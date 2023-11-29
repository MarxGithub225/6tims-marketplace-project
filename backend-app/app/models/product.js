const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductSchema = new mongoose.Schema(
  {
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
    category3Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category3',
      default: null
    },
    refuseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Refuse',
      default: null
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      default: null
    },
    model: {
      type: String
    },
    weight: {
      type: String
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    cost: {
      type: Number,
      default: 0
    },
    promoCost: {
      type: Number,
      default: 0
    },
    boughtNumber: {
      type: Number,
      default: 0
    },
    bonusNumber: {
      type: Number,
      default: 0
    },
    promostartDate: {
      type: Date,
      default: null
    },
    promoType: {
      type: String,
      default: '',
      enum: ['', 'sold', 'discount', 'bonus']
    },
    promoendDate: {
      type: Date,
      default: null
    },
    isPromoted: {
      type: Boolean,
      default: false
    },
    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color',
      default: null
    },
    variables: [
      {
        sku: {
          type: String
        },
        label: {
          type: String
        },
        quantity: {
          type: Number,
          default: 0
        },
        isActivated: {
          type: Boolean,
          default: true
        }
      }
    ],
    historical: [
      {
        type: {
          type: String,
          default: 'view',
          enum: ['like', 'view', 'sell', 'comment']
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
        ],
        actedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: null
        },
        actedAt: {
          type: Date
        }
      }
    ],
    imageIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
    mainImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      default: null
    },
    smallDescription: {
      type: String,
      maxLength: 300
    },
    fullDescription: {
      type: String,
      required: true
    },
    principalFeatures: {
      type: String
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    purchaseCount: {
      type: Number,
      default: 0
    },
    ratings: [
      {
        star: Number,
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
    totalrating: {
      type: Number,
      default: 0
    },
    suspended: {
      type: Boolean,
      default: false
    },
    new: {
      type: Boolean,
      default: true
    },
    updated: {
      type: Boolean,
      default: false
    },
    approved: {
      type: Boolean,
      default: false
    },
    cancelled: {
      type: Boolean,
      default: false
    },
    archived: {
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

ProductSchema.virtual('createdUser', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('updatedUser', {
  ref: 'User',
  localField: 'updatedBy',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('category2', {
  ref: 'Category2',
  localField: 'category2Id',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('category3', {
  ref: 'Category3',
  localField: 'category3Id',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('refuse', {
  ref: 'Refuse',
  localField: 'refuseId',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('seller', {
  ref: 'Seller',
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('brand', {
  ref: 'Brand',
  localField: 'brandId',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('color', {
  ref: 'Color',
  localField: 'colorId',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('images', {
  ref: 'Image',
  localField: 'imageIds',
  foreignField: '_id',
  justOne: false
})

ProductSchema.virtual('historical.owner', {
  ref: 'User',
  localField: 'historical.actedBy',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('ratings.owner', {
  ref: 'User',
  localField: 'ratings.postedBy',
  foreignField: '_id',
  justOne: true
})

ProductSchema.virtual('likes.owner', {
  ref: 'User',
  localField: 'likes.likedBy',
  foreignField: '_id',
  justOne: true
})

ProductSchema.set('toObject', {virtuals: true})
ProductSchema.set('toJSON', {virtuals: true})

ProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', ProductSchema)
