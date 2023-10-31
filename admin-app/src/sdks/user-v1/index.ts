// eslint-disable-next-line no-unused-vars
import * as dataSchemas from './utils/DataSchemas'

import API from './config'
import ProfileService from './services/profile'
import UserService from './services/user'
import { Options } from '../../api/DataSchemas'
import { Pagination } from '../GlobalDataSchemas'

const objectAssignDeep = require(`object-assign-deep`)

export class Client {
  options: Options
  private profileService!: ProfileService
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
    this.profileService = new ProfileService(this.options)
    this.userService = new UserService(this.options)
  }

  getMe = (): Promise<Record<string, any>> => {
    return this.profileService.getMe()
  }

  updateProfile = (id: string , data: dataSchemas.CreateRequest): Promise<Record<string, any>> => {
    return this.profileService.updateProfile(id, data)
  }

  changePassword = (data: dataSchemas.ChangePassword): Promise<Record<string, any>> => {
    return this.profileService.changePassword(data)
  }


  createUser = (data: dataSchemas.CreateRequest): Promise<Record<string, any>> => {
    return this.userService.createUser(data)
  }

  updateUser = (id: string , data: dataSchemas.CreateRequest): Promise<Record<string, any>> => {
    return this.userService.updateUser(id , data)
  }

  getUsers = (
    paginationOption: dataSchemas.PaginationOptionUser = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.FullUserProfile>> =>
  this.userService.getUsers({
    ...paginationOption
  })

  getUserById = (id: string): Promise<dataSchemas.FullUserProfile> =>
  this.userService.getUserById(id)

  deleteUser = (
    id: string
  ): Promise<string> => this.userService.deleteUser(id)
}

export * as types from './utils/DataSchemas'
