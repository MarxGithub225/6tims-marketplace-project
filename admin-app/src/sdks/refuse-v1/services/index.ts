import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, PaginationOptionRefuse } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionRefuse) {
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

    if (typeof paginationOption.validated !== "undefined") {
      query += `&validated=${paginationOption.validated}`
    }

    return query
  }

export default class Service {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createRefuse(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `product-refuses`, requestOptions)
    }

    async getRefuses(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `product-refuses/${query}`, this.options)
    }

    async getAllRefuses(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `product-refuses/all${query}`, this.options)
    }

    async getRefuseById(id: string) {
      return request('GET', `product-refuses/${id}`, this.options)
    }

    async deleteRefuse(id: string) {
    
        return request('DELETE', `product-refuses/${id}`, this.options)
    }

    async updateRefuse(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `product-refuses/${id}`, requestOptions)
    }
}
