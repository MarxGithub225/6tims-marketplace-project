import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, PaginationOptionBlog, CommentRequest } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionBlog) {
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
    async createblog(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `blogs`, requestOptions)
    }

    async getblogs(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `blogs/${query}`, this.options)
    }

    async getAllblogs(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `blogs/all${query}`, this.options)
    }

    async getRecentsBlogs(paginationOption: PaginationOption, id: string) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `blogs/all-recents/${id}${query}`, this.options)
    }

    async getblogById(id: string) {
      return request('GET', `blogs/${id}`, this.options)
    }

    async deleteblog(id: string) {
    
        return request('DELETE', `blogs/${id}`, this.options)
    }

    async updateblog(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `blogs/${id}`, requestOptions)
    }

    async likeBlog(id: string) {
      return request('PUT', `blogs/like/${id}`, this.options)
    }

    async commentBlog(id: string, data: CommentRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
      return request('PUT', `blogs/comment/${id}`, requestOptions)
    }

    async viewBlog(id: string) {
      return request('PUT', `blogs/view/${id}`, this.options)
    }
}
