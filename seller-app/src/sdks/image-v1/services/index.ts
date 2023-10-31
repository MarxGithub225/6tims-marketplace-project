import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { CreateRequestFile, CreateRequestImage } from '../utils/DataSchemas'


export default class Service {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createImage(data: CreateRequestImage) {
        const formData = new FormData()
        formData.append('image', data.image)
    
        const requestOptions: Options = {
          ...this.options,
          headers: {
            'Content-Type': 'multipart/form-data',
            ...this.options.headers
          },
          data: formData
        }
    
        return request('POST', `images/${data.path}`, requestOptions)
    }

    async createFile(data: CreateRequestFile) {
      const formData = new FormData()
      formData.append('file', data.file)
  
      const requestOptions: Options = {
        ...this.options,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...this.options.headers
        },
        data: formData
      }
  
      return request('POST', `images/file`, requestOptions)
  }
    
    async deleteFile(folder: string, path: string, id: string) {
        return request('DELETE', `images/delete/${folder}/${path}/${id}`, this.options)
    }
}
