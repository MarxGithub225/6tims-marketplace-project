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

  getAllAdminCategories = (
    paginationOption: dataSchemas.PaginationOptionCategory = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Category1>> =>
  this.service.getAllAdminCategories({
    ...paginationOption
  })

  getAllAdminSubCategories = (
    paginationOption: dataSchemas.PaginationOptionCategory = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Category2>> =>
  this.service.getAllAdminSubCategories({
    ...paginationOption
  })

  getAllAdminSubCategories2 = (
    paginationOption: dataSchemas.PaginationOptionCategory = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Category3>> =>
  this.service.getAllAdminSubCategories2({
    ...paginationOption
  })

  getAllPublishedCategories = (
    paginationOption: dataSchemas.PaginationOptionCategory = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Category1>> =>
  this.service.getAllPublishedCategories({
    ...paginationOption
  })

  getAllPublishedSubCategories = (
    paginationOption: dataSchemas.PaginationOptionCategory = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Category2>> =>
  this.service.getAllPublishedSubCategories({
    ...paginationOption
  })

  getAllPublishedSubCategories2 = (
    paginationOption: dataSchemas.PaginationOptionCategory = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Category3>> =>
  this.service.getAllPublishedSubCategories2({
    ...paginationOption
  })

  createCategory = (
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.createCategory(body)

  createSubCategory = (
    body: dataSchemas.CreateRequest2
  ): Promise<string> => this.service.createSubCategory(body)

  createSubCategory2 = (
    body: dataSchemas.CreateRequest3
  ): Promise<string> => this.service.createSubCategory2(body)

  updateCategory = (
    id: string,
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.updateCategory(id, body)

  updateSubCategory = (
    id: string,
    body: dataSchemas.CreateRequest2
  ): Promise<string> => this.service.updateSubCategory(id, body)

  updateSubCategory2 = (
    id: string,
    body: dataSchemas.CreateRequest3
  ): Promise<string> => this.service.updateSubCategory2(id, body)

  deleteCategory = (
    id: string
  ): Promise<string> => this.service.deleteCategory(id)

  deleteSubCategory = (
    id: string
  ): Promise<string> => this.service.deleteSubCategory(id)

  deleteSubCategory2 = (
    id: string
  ): Promise<string> => this.service.deleteSubCategory2(id)

  clickCategory = (
    id: string
  ): Promise<string> => this.service.clickCategory(id)

  clickSubCategory = (
    id: string
  ): Promise<string> => this.service.clickSubCategory(id)

  clickSubCategory2 = (
    id: string
  ): Promise<string> => this.service.clickSubCategory2(id)
}

export * as types from './utils/DataSchemas'
