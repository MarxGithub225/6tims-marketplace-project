import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { AuthorizeRequest, PasswordResetCodeRequest, RefreshTokenRequest, ResetPasswordCodeRequest } from '../../auth-v1/utils/DataSchemas'
import { ChangePassword } from '../../user-v1/utils/DataSchemas'
import { CreateRequest, PaginationOptionSeller } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionSeller) {
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

    if (typeof paginationOption.verified_only !== "undefined") {
      query += `&verified_only=${paginationOption.verified_only}`
    }

    if (typeof paginationOption.deleted_only !== "undefined") {
      query += `&deleted_only=${paginationOption.deleted_only}`
    }

    return query
  }

export default class Service {
    options: Options

    constructor(options: Options) {
        this.options = options
    }

    async getMe() {
      return request('GET', `sellers/profile`, this.options)
    }
    async createSeller(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `sellers`, requestOptions)
    }

    async getSellers(paginationOption: PaginationOptionSeller) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `sellers/${query}`, this.options)
    }

    async getBestSellers(paginationOption: PaginationOptionSeller) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `sellers/best/${query}`, this.options)
    }


    async getSellerById(id: string) {
      return request('GET', `sellers/id/${id}`, this.options)
    }

    async deleteSeller(id: string) {
    
        return request('PATCH', `sellers/delete/${id}`, this.options)
    }

    async updateSeller(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `sellers/${id}`, requestOptions)
    }

    async login(data: AuthorizeRequest) {
      const requestOptions: Options = {
          ...this.options,
          data: data,
      }
        return request('POST', `sellers/login`, requestOptions)
    }

    async refreshToken(data: RefreshTokenRequest) {
        const requestOptions: Options = {
            ...this.options,
            headers: {
                ...this.options.headers,
                Authorization: `Bearer ${data.refreshToken}`
            },
            data: ''
        }
        return request('GET', `sellers/token`, requestOptions)
    }

    async resetPasswordCode(data: ResetPasswordCodeRequest) {
        const requestOptions: Options = {
            ...this.options,
            data: data,
        }
        return request('POST', `sellers/forgot`, requestOptions)
    }

    async passwordResetCode(data: PasswordResetCodeRequest) {
        const requestOptions: Options = {
            ...this.options,
            data: data,
        }
        return request('POST', `sellers/reset`, requestOptions)
    }

    async changePassword(data: ChangePassword) {
      const requestOptions: Options = {
      ...this.options,
      data: data
      }
  
          return request('POST', `sellers/changePassword`, requestOptions)
   }

   async verifySeller(id: string) {
    
    return request('POST', `sellers/verify/${id}`, this.options)
  }
}
