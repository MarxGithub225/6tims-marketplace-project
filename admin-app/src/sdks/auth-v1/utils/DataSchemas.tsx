import { UserAddress } from "../../user-v1/utils/DataSchemas"

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  gender: string
  imageId: string | null
  address: UserAddress
  newsletterSubscribed: boolean
}

export interface ChangePasswordRequest {
  old_password: string
  new_password: string
  confirm_password: string
}

export interface RegisterConfirmationCodeRequest {
  email?: string
  code?: string
}

export interface AuthorizeRequest {
  email: string
  password: string
}

export interface AuthorizeResponse {
  token: string
  refreshToken: string
}

export interface RefreshTokenResponse {
  token: string
  refreshToken: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface ResetPasswordCodeRequest {
  email: string
}

export interface PasswordResetCodeRequest {
  code: string
  password: string
}
