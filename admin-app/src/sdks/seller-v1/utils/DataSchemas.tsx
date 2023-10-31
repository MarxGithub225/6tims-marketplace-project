import { PaginationOption } from "../../GlobalDataSchemas"
import { File } from "../../image-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  email: string
  personnalInfo: PersonnalInfo
  locationInfo: LocationInfo
  companyInfo: CompanyInfo
  bankInfo: bankInfo
  deleted: boolean
  suspended: boolean
  password: string
}

export interface Cancellation {
  note: string
  cancelledBy: string
  cancelledOwner?: FullUserProfile
}
export interface CancelRequest {
  cancellation: Cancellation
}

export interface PersonnalInfo {
  fullName: string
  firstName: string
  lastName: string
  imageId: string | null
  image: File
  number: string
  identityCardType: string
  identityCardNumber: string
  identityCardFileId: string
  identityCardFile: File
}

export interface LocationInfo {
  cityName: string
  postalCode: string
}

export interface CompanyInfo {
  companyName: string
  commercialRegister: string
  taxpayerAccountNumber: string
}

export interface bankInfo {
  rib: string
  bankName: string
  bankCode: string
  iban: string
  ownerFullName: string
  ribFileId: string
  ribFile: File
}
export interface Seller {
  _id: string
  email: string
  personnalInfo: PersonnalInfo
  locationInfo: LocationInfo
  companyInfo: CompanyInfo
  bankInfo: bankInfo
  verified: boolean
  deleted: boolean
  suspended: boolean
  soldNumber: number
  createdAt: Date
  updatedAt: Date
  cancellation: Cancellation
}

export interface PaginationOptionSeller extends PaginationOption{
  published_only?: string
  verified_only?: string
  deleted_only?: string
}