import { PaginationOption } from "../../GlobalDataSchemas"
import { File } from "../../image-v1/utils/DataSchemas"
import { FullUserProfile } from "../../user-v1/utils/DataSchemas"

export interface CreateRequest {
  title: string
  imageId: string | null
  largeImageId: string | null
  description: string
  videoUrl: string
  isVideo: boolean
  videoDuration: number
  readDuration: number
  suspended: boolean
}

export interface Blog {
  _id: string
  title: string
  imageId: string
  largeImageId: string
  videoUrl: string
  slug: string
  description: string
  viewsCount: number
  comments: {
    likedBy: string
    owner: FullUserProfile
    likedAt: Date
  }[]
  likes: {
    likedBy: string
    owner: FullUserProfile
    likedAt: Date
  }[]
  isVideo: boolean
  videoDuration: number
  readDuration: number
  suspended: boolean
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedUser: FullUserProfile
  createdUser: FullUserProfile
  image: File
  largeImage: File
}

export interface PaginationOptionBlog extends PaginationOption{
  published_only?: string
}