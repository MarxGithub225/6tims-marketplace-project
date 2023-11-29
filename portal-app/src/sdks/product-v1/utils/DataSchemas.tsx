import { PaginationOption } from "../../GlobalDataSchemas"
import { Brand } from "../../brand-v1/utils/DataSchemas"
import { Category, Category1, Category2, Category3 } from "../../category-v1/utils/DataSchemas"
import { Color } from "../../color-v1/utils/DataSchemas"
import { File } from "../../image-v1/utils/DataSchemas"
import { Seller } from "../../seller-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  categoryId: string
  category2Id: string
  category3Id: string | null
  sellerId: string
  brandId: string
  model: string
  weight: string
  title: string
  cost: number
  promoCost: number
  boughtNumber: number
  bonusNumber: number
  promostartDate: Date | null
  promoType: string
  promoendDate: Date | null
  isPromoted: boolean
  colorId: string
  mainImage: string
  variables : Array<Variable>
  imageIds: Array<string>
  smallDescription: string
  fullDescription: string
  principalFeatures: string
  suspended: boolean
  new: boolean
  updated: boolean
  approved: boolean
  cancelled: boolean
  archived: boolean
}

export interface Historical {
  type: string
  count: number
  variable: string
  sku: string
  actedBy: string
  actedAt: Date
  owner: FullUserProfile
}

export interface Variable {
  sku: string
  label: string
  quantity: number
  isActivated: boolean
}

export interface CommentRequest {
  comment: string
  star: number
}

export interface Product {
  _id: string
  categoryId: string
  category2Id: string
  category3Id: string
  refuseId: string
  sellerId: string
  brandId: string
  model: string
  weight: string
  title: string
  slug: string
  cost: number
  promoCost: number
  boughtNumber: number
  bonusNumber: number
  promostartDate: Date
  promoType: string
  promoendDate: Date
  isPromoted: boolean
  mainImage: string
  colorId: string
  variables : Array<Variable>
  imageIds: Array<string>
  smallDescription: string
  fullDescription: string
  principalFeatures: string
  viewsCount: number
  purchaseCount: number
  ratings: Array <{
    star: number
    comment: string
    postedBy: string
    postedAt: Date
    owner: FullUserProfile
  }>
  historical: Array<Historical>
  likes: Array <{
    likedBy: string
    likedAt: Date
    owner: FullUserProfile
  }>
  totalrating: number
  suspended: boolean
  new: boolean
  updated: boolean
  approved: boolean
  cancelled: boolean
  archived: boolean
  createdBy: string
  updatedBy: string
  createdUser: FullUserProfile
  updatedUser: FullUserProfile
  category: Category1
  category2: Category2
  category3: Category3
  refuse: any
  seller: Seller
  brand: Brand
  color: Color
  images: Array<File>

}

export interface PaginationOptionProduct extends PaginationOption{
  published_only?: string
  approved?: string
  new?: string
  cancelled?: string
  archived?: string
  sellerId?: string
  categoryId?: string
  category2Id?: string
  category3Id?: string
  min?: string
  max?: string
  rating?: string
  search?: string
}