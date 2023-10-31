import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  name: string
  code: string
}

export interface Color {
  _id: string
  name: string
  code: string
  createdBy: string
  updatedBy: string
  updatedUser: FullUserProfile
  createdUser: FullUserProfile
}