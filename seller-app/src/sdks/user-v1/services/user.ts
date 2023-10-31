import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, PaginationOptionUser } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionUser) {
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

    if (typeof paginationOption.role !== "undefined") {
      query += `&role=${paginationOption.role}`
    }

    return query
  }

export default class UserService {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createUser(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `users`, requestOptions)
    }

    async getUsers(paginationOption: PaginationOptionUser) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `users/${query}`, this.options)
    }


    async getUserById(id: string) {
      return request('GET', `users/${id}`, this.options)
    }

    async deleteUser(id: string) {
    
        return request('DELETE', `users/${id}`, this.options)
    }

    async updateUser(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `users/${id}`, requestOptions)
    }
}
