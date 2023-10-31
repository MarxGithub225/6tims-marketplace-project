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

  getAllblogs = (
    paginationOption: dataSchemas.PaginationOptionBlog = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Blog>> =>
  this.service.getblogs({
    ...paginationOption
  })

  getPublishedBlogs = (
    paginationOption: dataSchemas.PaginationOptionBlog = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Blog>> =>
  this.service.getAllblogs({
    ...paginationOption
  })

  getblogById = (id: string): Promise<dataSchemas.Blog> =>
  this.service.getblogById(id)

  createblog = (
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.createblog(body)

  updateblog = (
    id: string,
    body: dataSchemas.CreateRequest
  ): Promise<string> => this.service.updateblog(id, body)

  deleteblog = (
    id: string
  ): Promise<string> => this.service.deleteblog(id)

  likeBlog = (
    id: string
  ): Promise<string> => this.service.likeBlog(id)

  commentBlog = (
    id: string
  ): Promise<string> => this.service.commentBlog(id)

  viewBlog = (
    id: string
  ): Promise<string> => this.service.viewBlog(id)
}

export * as types from './utils/DataSchemas'
