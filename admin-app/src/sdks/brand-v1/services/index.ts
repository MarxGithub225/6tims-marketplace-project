import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, PaginationOptionBrand } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionBrand) {
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

    if (typeof paginationOption.published_only !== "undefined") {
      query += `&published_only=${paginationOption.published_only}`
    }

    return query
  }

export default class Service {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createBrand(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `brands`, requestOptions)
    }

    async getBrands(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `brands/${query}`, this.options)
    }

    async getAllBrands(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `brands/all${query}`, this.options)
    }

    async getBrandById(id: string) {
      return request('GET', `brands/${id}`, this.options)
    }

    async deleteBrand(id: string) {
    
        return request('DELETE', `brands/${id}`, this.options)
    }

    async updateBrand(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `brands/${id}`, requestOptions)
    }
}
