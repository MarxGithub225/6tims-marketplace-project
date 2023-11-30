// eslint-disable-next-line no-unused-vars
import * as dataSchemas from './utils/DataSchemas'

import API from './config'
import NewsletterService from './services/newsletter'
import { Options } from '../../api/DataSchemas'
import { Pagination } from '../GlobalDataSchemas'

const objectAssignDeep = require(`object-assign-deep`)

export class Client {
  options: Options
  private newsletterService!: NewsletterService

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
    this.newsletterService = new NewsletterService(this.options)
  }

  createNewsletter = (data: dataSchemas.CreateRequest): Promise<Record<string, any>> => {
    return this.newsletterService.createNewsletter(data)
  }

  updateNewsletter = (id: string , data: dataSchemas.CreateRequest): Promise<Record<string, any>> => {
    return this.newsletterService.updateNewsletter(id , data)
  }

  getNewsletters = (
    paginationOption: dataSchemas.PaginationOptionNewsletter = { page: 1, limit: 10}
  ): Promise<Pagination<dataSchemas.Newsletter>> =>
  this.newsletterService.getNewsletters({
    ...paginationOption
  })
}

export * as types from './utils/DataSchemas'
