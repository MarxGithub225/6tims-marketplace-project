import { PaginationOption } from "../../GlobalDataSchemas"
import { File } from "../../image-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  cost: number
  fees: number
  paidMethod: string
  products: Array<any>
  shippingAddress: {
    phone: string
    state: string
    city: string
    fullLocation: string
    zipCode: string
  }
  orderStatus: string
  orderDetails: Array<any>
}

export interface Order {
  _id: string
  cost: number
  fees: number
  paidMethod: string
  products: Array<any>
  shippingAddress: {
    phone: string
    state: string
    city: string
    fullLocation: string
    zipCode: string
  }
  orderStatus: string
  historical: Array<any>
}

export interface PaginationOptionOrder extends PaginationOption{
  published_only?: string
  status?: string
  orderBy?: string
}