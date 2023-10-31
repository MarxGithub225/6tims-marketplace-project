import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, PaginationOptionPartner } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionPartner) {
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
    async createPartner(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `partners`, requestOptions)
    }

    async getPartners(paginationOption: PaginationOptionPartner) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `partners/${query}`, this.options)
    }

    async getAllPublishedPartners(paginationOption: PaginationOptionPartner) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `partners/all${query}`, this.options)
    }

    async getPartnerById(id: string) {
      return request('GET', `partners/${id}`, this.options)
    }

    async deletePartner(id: string) {
    
        return request('DELETE', `partners/${id}`, this.options)
    }

    async updatePartner(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `partners/${id}`, requestOptions)
    }
}
