import { PaginationOption } from "../../GlobalDataSchemas"
import { Seller } from "../../seller-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  suspended: boolean
  sellerId?: string
}

export interface Partner {
  _id: string
  sellerId: string
  seller: Seller
  suspended: boolean
  clicksNumber: number
  createdBy: string
  updatedBy: string
  updatedUser: FullUserProfile
  createdUser: FullUserProfile
}

export interface PaginationOptionPartner extends PaginationOption{
  published_only?: string
}