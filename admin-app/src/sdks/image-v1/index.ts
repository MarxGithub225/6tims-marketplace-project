// eslint-disable-next-line no-unused-vars
import * as dataSchemas from './utils/DataSchemas'

import API from './config'
import Service from './services'
import { Options } from '../../api/DataSchemas'

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


  createImage = (
    body: dataSchemas.CreateRequestImage
  ): Promise<dataSchemas.File> => this.service.createImage(body)

  createFile = (
    body: dataSchemas.CreateRequestFile
  ): Promise<dataSchemas.File> => this.service.createFile(body)

  deleteFile = (
    folder: string,
    path: string,
    id: string
  ): Promise<string> => this.service.deleteFile(folder, path, id)
}

export * as types from './utils/DataSchemas'
