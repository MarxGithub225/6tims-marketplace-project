// eslint-disable-next-line no-unused-vars
import * as dataSchemas from './utils/DataSchemas'

import API from './config'
import Service from './services'
import { Options } from '../../api/DataSchemas'
import { Pagination, PaginationOption } from '../GlobalDataSchemas'

const objectAssignDeep = require(`object-assign-deep`)

export class Client {
  options: Options
  private service!: Service

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
    this.service = new Service(this.options)
  }

  getAllBanners = (
    paginationOption: PaginationOption = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Banner>> =>
  this.service.getBanners({
    ...paginationOption
  })

  getPublishedBanners = (
    paginationOption: PaginationOption = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Banner>> =>
  this.service.getAllBanners({
    ...paginationOption
  })

  createBanner = (
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.createBanner(body)

  updateBanner = (
    id: string,
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.updateBanner(id, body)

  deleteBanner = (
    id: string
  ): Promise<string> => this.service.deleteBanner(id)

  clickBanner = (
    id: string
  ): Promise<string> => this.service.clickBanner(id)
}

export * as types from './utils/DataSchemas'
