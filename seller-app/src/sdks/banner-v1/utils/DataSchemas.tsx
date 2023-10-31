import { PaginationOption } from "../../GlobalDataSchemas"
import { File } from "../../image-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  link: string
  suspended: boolean
  imageId: string | null
  startDate: Date
  endDate: Date
}

export interface Banner {
  _id: string
  link: string
  suspended: boolean
  imageId: string
  startDate: Date
  endDate: Date
  image: File
  clicksNumber: number
  createdBy: string
  updatedBy: string
  updatedUser: FullUserProfile
  createdUser: FullUserProfile
}

export interface PaginationOptionBanner extends PaginationOption{
  published_only?: string
}