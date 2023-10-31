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

  getAllProducts = (
    paginationOption: dataSchemas.PaginationOptionProduct = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Product>> =>
  this.service.getProducts({
    ...paginationOption
  })

  getPublishedProducts = (
    paginationOption: dataSchemas.PaginationOptionProduct = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Product>> =>
  this.service.getAllProducts({
    ...paginationOption
  })

  getBestProducts = (
    paginationOption: dataSchemas.PaginationOptionProduct = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Product>> =>
  this.service.getBestProducts({
    ...paginationOption
  })

  getAllProductsGroupByCategories = (
    paginationOption: dataSchemas.PaginationOptionProduct = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Product>> =>
  this.service.getAllProductsGroupByCategories({
    ...paginationOption
  })

  getProductById = (id: string): Promise<dataSchemas.Product> =>
  this.service.getProductById(id)

  createProduct = (
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.createProduct(body)

  updateProduct = (
    id: string,
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.updateProduct(id, body)


  likeProduct = (
    id: string
  ): Promise<string> => this.service.likeProduct(id)

  commentProduct = (
    id: string
  ): Promise<string> => this.service.commentProduct(id)

  viewProduct = (
    id: string
  ): Promise<string> => this.service.viewProduct(id)
}

export * as types from './utils/DataSchemas'
