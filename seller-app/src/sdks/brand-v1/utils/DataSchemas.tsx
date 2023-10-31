import { PaginationOption } from "../../GlobalDataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  label: string
  suspended: boolean
}

export interface Brand {
  _id: string
  label: string
  suspended: boolean
  createdBy: string
  updatedBy: string
  updatedUser: FullUserProfile
  createdUser: FullUserProfile
}

export interface PaginationOptionBrand extends PaginationOption{
  published_only?: string
}