import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequestImage {
  image: Blob
  path: string
}
export interface CreateRequestFile {
  file: Blob
}

export interface File {
  _id: string
  path: string
  createdBy: string
  createdUser: FullUserProfile
}