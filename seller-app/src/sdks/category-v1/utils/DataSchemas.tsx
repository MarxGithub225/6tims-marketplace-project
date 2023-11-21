import { PaginationOption } from "../../GlobalDataSchemas"
import { File } from "../../image-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  label: string
  iconId: string | null
  imageId: string | null
  sizeGuide: string
  suspended: boolean
  percent: number
}

export interface CreateRequest2 extends CreateRequest {
  categoryId: string
}

export interface CreateRequest3 extends CreateRequest {
  categoryId: string
  category2Id: string
}

export interface Category {
  _id: string
  label: string
  iconId: string
  imageId: string
  sizeGuide: string
  suspended: string
  createdBy: string
  updatedBy: string
  clicksNumber: string
  percent: number
  updatedUser: FullUserProfile
  createdUser: FullUserProfile
  icon: File
  image: File
}

export interface Category1 extends Category {
  subCategory2Ids: Array<string>
  subCategory3Ids: Array<string>
  subCategories2: Array<Category2>
  subCategories3: Array<Category3>
}

export interface Category2 extends Category {
  categoryId: string
  subCategory3Ids: Array<string>
  category: Category1
  subCategories3: Array<Category3>
}

export interface Category3 extends Category {
  categoryId: string
  category2Id: string
  category: Category1
  category2: Category2
}

export interface PaginationOptionCategory extends PaginationOption{
  published_only?: string
}