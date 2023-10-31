import { PaginationOption } from "../../GlobalDataSchemas"
import { Seller } from "../../seller-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  name: string
  suspended: boolean
  sellerId: string
  imageId: string | null
}

export interface Partner {
  _id: string
  name: string
  sellerId: string
  seller: Seller
  suspended: boolean
  imageId: string
  image: File
  clicksNumber: number
  createdBy: string
  updatedBy: string
  updatedUser: FullUserProfile
  createdUser: FullUserProfile
}

export interface PaginationOptionPartner extends PaginationOption{
  published_only?: string
}