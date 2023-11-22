// eslint-disable-next-line no-unused-vars
import * as dataSchemas from './utils/DataSchemas'

import API from './config'
import AuthService from './services/auth'
import { Options } from '../../api/DataSchemas'

const objectAssignDeep = require(`object-assign-deep`)

export class Client {
  options: Options
  private authService!: AuthService

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
    this.authService = new AuthService(this.options)
  }

  register = (data: dataSchemas.RegisterRequest): Promise<Record<string, any>> => {
    return this.authService.register(data)
  }

  authorize = (data: dataSchemas.AuthorizeRequest): Promise<dataSchemas.AuthorizeResponse> => {
    return this.authService.login(data)
  }

  login = (data: dataSchemas.AuthorizeRequest): Promise<dataSchemas.AuthorizeResponse> => {
    return this.authService.login(data)
  }

  refreshToken = (data: dataSchemas.RefreshTokenRequest): Promise<dataSchemas.RefreshTokenResponse> => {
    return this.authService.refreshToken(data)
  }

  resetPasswordCode = (data: dataSchemas.ResetPasswordCodeRequest): Promise<Record<string, any>> => {
    return this.authService.resetPasswordCode(data)
  }

  passwordResetCode = (data: dataSchemas.PasswordResetCodeRequest): Promise<Record<string, any>> => {
    return this.authService.passwordResetCode(data)
  }


}

export * as types from './utils/DataSchemas'
