import { PaginationOption } from "../../GlobalDataSchemas"
import { Product } from "../../product-v1/utils/DataSchemas"
import { Seller } from "../../seller-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  reason: Array<string>
  productId: string
  ownerId: string
  notes: string
  validated: boolean
}

export interface Refuse {
  _id: string
  reason: Array<string>
  productId: string
  ownerId: string
  notes: string
  validated: boolean
  createdBy: string
  updatedBy: string
  updatedUser: FullUserProfile
  createdUser: FullUserProfile
  product: Product
  owner: Seller
}

export interface PaginationOptionRefuse extends PaginationOption{
  validated?: string
}