// eslint-disable-next-line no-unused-vars
import * as dataSchemas from './utils/DataSchemas'

import API from './config'
import UserService from './services'
import { Options } from '../../api/DataSchemas'
import { Pagination } from '../GlobalDataSchemas'
import { AuthorizeRequest, AuthorizeResponse, PasswordResetCodeRequest, RefreshTokenRequest, RefreshTokenResponse, ResetPasswordCodeRequest } from '../auth-v1/utils/DataSchemas'
import { ChangePassword } from '../user-v1/utils/DataSchemas'

const objectAssignDeep = require(`object-assign-deep`)

export class Client {
  options: Options
  private userService!: UserService

  /**
   * Initiate client instance
   * @param options Optional. Set options for HTTP requests
   */
  constructor(options?: Options) {
    const defaultOptions = {
      baseURL: API.baseUrl,
      version: API.version,
      timeout: API.timeout,
      responseType: 'json',
      getNewToken: options?.getNewToken
    }
    this.options = objectAssignDeep({}, defaultOptions, options)
  }

  /**
   * Configure client instance
   * @param options Optional. Set options for HTTP requests
   */
  configure = (options?: Options) => {
    this.options = objectAssignDeep(this.options, options)
    this.userService = new UserService(this.options)
  }

  getMe = (): Promise<dataSchemas.Seller> => {
    return this.userService.getMe()
  }

  login = (data: AuthorizeRequest): Promise<AuthorizeResponse> => {
    return this.userService.login(data)
  }

  refreshToken = (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    return this.userService.refreshToken(data)
  }

  resetPasswordCode = (data: ResetPasswordCodeRequest): Promise<Record<string, any>> => {
    return this.userService.resetPasswordCode(data)
  }

  passwordResetCode = (data: PasswordResetCodeRequest): Promise<Record<string, any>> => {
    return this.userService.passwordResetCode(data)
  }


  createSeller = (data: dataSchemas.CreateRequest): Promise<Record<string, any>> => {
    return this.userService.createSeller(data)
  }

  updateSeller = (id: string , data: dataSchemas.CreateRequest): Promise<Record<string, any>> => {
    return this.userService.updateSeller(id , data)
  }

  getSellers = (
    paginationOption: dataSchemas.PaginationOptionSeller = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Seller>> =>
  this.userService.getSellers({
    ...paginationOption
  })

  getBestSellers = (
    paginationOption: dataSchemas.PaginationOptionSeller = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Seller>> =>
  this.userService.getBestSellers({
    ...paginationOption
  })

  getSellerById = (id: string): Promise<dataSchemas.Seller> =>
  this.userService.getSellerById(id)

  deleteSeller = (
    id: string
  ): Promise<string> => this.userService.deleteSeller(id)

  verifySeller = (
    id: string
  ): Promise<string> => this.userService.verifySeller(id)

  changePassword = (data: ChangePassword): Promise<Record<string, any>> => {
    return this.userService.changePassword(data)
  }
}

export * as types from './utils/DataSchemas'
