import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOption) {
    let query = `?page=${paginationOption.page}&limit=${paginationOption.limit}`

    if (typeof paginationOption.filter !== "undefined") {
      query += `&filter=${paginationOption.filter}`
    }

    if (typeof paginationOption.fields !== "undefined") {
      query += `&fields=${paginationOption.fields}`
    }

    if (typeof paginationOption.sort !== "undefined") {
      query += `&sort=${paginationOption.sort}`
    }

    if (typeof paginationOption.order !== "undefined") {
      query += `&order=${paginationOption.order}`
    }
    return query
  }

export default class Service {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createColor(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `colors`, requestOptions)
    }

    async getColors(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `colors/${query}`, this.options)
    }

    async getAllColors(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `colors/all${query}`, this.options)
    }

    async getColorById(id: string) {
      return request('GET', `colors/${id}`, this.options)
    }

    async deleteColor(id: string) {
    
        return request('DELETE', `colors/${id}`, this.options)
    }

    async updateColor(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `colors/${id}`, requestOptions)
    }
}
