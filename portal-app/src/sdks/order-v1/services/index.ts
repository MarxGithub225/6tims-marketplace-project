import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, PaginationOptionOrder } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionOrder) {
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

    if (typeof paginationOption.orderBy !== "undefined") {
      query += `&orderBy=${paginationOption.orderBy}`
    }
    if (typeof paginationOption.status !== "undefined") {
      query += `&status=${paginationOption.status}`
    }

    return query
  }

export default class Service {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createOrder(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `orders`, requestOptions)
    }

    async getOrders(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `orders/${query}`, this.options)
    }

    async getAllOrders(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `orders/all${query}`, this.options)
    }

    async getOrderById(id: string) {
      return request('GET', `orders/${id}`, this.options)
    }

    async deleteOrder(id: string) {
    
        return request('DELETE', `orders/${id}`, this.options)
    }

    async updateOrder(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `orders/${id}`, requestOptions)
    }
}
