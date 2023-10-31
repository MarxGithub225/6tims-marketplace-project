import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, PaginationOptionBanner } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionBanner) {
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
    async createBanner(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `banners`, requestOptions)
    }

    async getBanners(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `banners/${query}`, this.options)
    }

    async getAllBanners(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `banners/all${query}`, this.options)
    }

    async getBannerById(id: string) {
      return request('GET', `banners/${id}`, this.options)
    }

    async deleteBanner(id: string) {
    
        return request('DELETE', `banners/${id}`, this.options)
    }

    async updateBanner(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `banners/${id}`, requestOptions)
    }

    async clickBanner(id: string) {
      return request('PUT', `banners/click/${id}`, this.options)
    }
}
