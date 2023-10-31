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

  getAllBrands = (
    paginationOption: PaginationOption = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Brand>> =>
  this.service.getBrands({
    ...paginationOption
  })

  getPublishedBrands = (
    paginationOption: PaginationOption = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Brand>> =>
  this.service.getAllBrands({
    ...paginationOption
  })

  createBrand = (
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.createBrand(body)

  updateBrand = (
    id: string,
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.updateBrand(id, body)

  deleteBrand = (
    id: string
  ): Promise<string> => this.service.deleteBrand(id)
}

export * as types from './utils/DataSchemas'
