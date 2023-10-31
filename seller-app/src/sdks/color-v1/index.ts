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

  getAllColors = (
    paginationOption: PaginationOption = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Color>> =>
  this.service.getColors({
    ...paginationOption
  })

  getPublishedColors = (
    paginationOption: PaginationOption = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Color>> =>
  this.service.getAllColors({
    ...paginationOption
  })

  createColor = (
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.createColor(body)

  updateColor = (
    id: string,
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.updateColor(id, body)

  deleteColor = (
    id: string
  ): Promise<string> => this.service.deleteColor(id)
}

export * as types from './utils/DataSchemas'
