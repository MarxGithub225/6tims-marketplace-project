// eslint-disable-next-line no-unused-vars
import * as dataSchemas from './utils/DataSchemas'

import API from './config'
import UserService from './services'
import { Options } from '../../api/DataSchemas'
import { Pagination } from '../GlobalDataSchemas'

const objectAssignDeep = require(`object-assign-deep`)

export class Client {
  options: Options
  private service!: UserService

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
    this.service = new UserService(this.options)
  }


  getAllPartners = (
    paginationOption: dataSchemas.PaginationOptionPartner = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Partner>> =>
  this.service.getPartners({
    ...paginationOption
  })

  getPublishedPartners = (
    paginationOption: dataSchemas.PaginationOptionPartner = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Partner>> =>
  this.service.getAllPublishedPartners({
    ...paginationOption
  })

  getPartnerById = (id: string): Promise<dataSchemas.Partner> =>
  this.service.getPartnerById(id)

  createPartner = (
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.createPartner(body)

  updatePartner = (
    id: string,
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.updatePartner(id, body)

  deletePartner = (
    id: string
  ): Promise<string> => this.service.deletePartner(id)
}

export * as types from './utils/DataSchemas'
