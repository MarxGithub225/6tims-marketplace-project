import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { CreateRequest, PaginationOptionNewsletter } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionNewsletter) {
    let query = `?page=${paginationOption.page}&limit=${paginationOption.limit}`
    
    if (typeof paginationOption.published_only !== "undefined") {
      query += `&published_only=${paginationOption.published_only}`
    }

    return query
  }

export default class NewsletterService {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createNewsletter(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `newsletters`, requestOptions)
    }

    async getNewsletters(paginationOption: PaginationOptionNewsletter) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `newsletters/${query}`, this.options)
    }

    async updateNewsletter(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `newsletters/${id}`, requestOptions)
    }
}
