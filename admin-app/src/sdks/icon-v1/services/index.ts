import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOption) {
    let query = `?page=${paginationOption.page}&limit=${paginationOption.limit}`
    return query
  }

export default class Service {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createIcon(data: CreateRequest) {
        const formData = new FormData()
        formData.append('icon', data.icon)
    
        const requestOptions: Options = {
          ...this.options,
          headers: {
            'Content-Type': 'multipart/form-data',
            ...this.options.headers
          },
          data: formData
        }
    
        return request('POST', `icons`, requestOptions)
    }
    async getAllIcones(paginationOption: PaginationOption) {
        const query = getPaginationQuery(paginationOption)
        return request('GET', `icons/${query}`, this.options)
    }
    async deleteIcon(path: string, id: string) {
    
        return request('DELETE', `icons/delete/${path}/${id}`, this.options)
    }
}
