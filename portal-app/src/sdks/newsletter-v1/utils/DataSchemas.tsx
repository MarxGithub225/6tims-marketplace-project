import { PaginationOption } from "../../GlobalDataSchemas"

export interface Newsletter {
  _id: string
  email: string
  suspended: boolean
}

export interface CreateRequest {
  email: string
  suspended: boolean
}

export interface PaginationOptionNewsletter extends PaginationOption{
    published_only?: string
}