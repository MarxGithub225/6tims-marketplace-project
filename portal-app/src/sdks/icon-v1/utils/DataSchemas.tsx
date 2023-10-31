import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  icon: Blob
}

export interface Icon {
  _id: string
  path: string
  createdBy: string
  createdUser: FullUserProfile
}