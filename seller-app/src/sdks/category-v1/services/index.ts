import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, CreateRequest2, CreateRequest3, PaginationOptionCategory } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionCategory) {
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
    async createCategory(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `categories`, requestOptions)
    }

    async createSubCategory(data: CreateRequest2) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `categories/sub`, requestOptions)
    }

    async createSubCategory2(data: CreateRequest3) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `categories/sub-2`, requestOptions)
    }

    async getAllAdminCategories(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `categories/admin/${query}`, this.options)
    }

    async getAllAdminSubCategories(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `categories/admin-sub/${query}`, this.options)
    }

    async getAllAdminSubCategories2(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `categories/admin-sub2/${query}`, this.options)
    }

    async getAllPublishedCategories(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `categories/all${query}`, this.options)
    }

    async getAllPublishedSubCategories(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `categories/all-sub${query}`, this.options)
    }
    async getAllPublishedSubCategories2(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `categories/all-sub-2${query}`, this.options)
    }

    async getCategoryById(id: string) {
      return request('GET', `categories/category/${id}`, this.options)
    }
    
    async getSubCategoryById(id: string) {
      return request('GET', `categories/sub-category/${id}`, this.options)
    }

    async getSubCategoryById2(id: string) {
      return request('GET', `categories/sub-category-2/${id}`, this.options)
    }

    async deleteCategory(id: string) {
    
        return request('DELETE', `categories/${id}`, this.options)
    }

    async deleteSubCategory(id: string) {
    
      return request('DELETE', `categories/sub/${id}`, this.options)
    }

    async deleteSubCategory2(id: string) {
    
      return request('DELETE', `categories/sub-2/${id}`, this.options)
    }

    async updateCategory(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `categories/${id}`, requestOptions)
    }

    async updateSubCategory(id: string , data: CreateRequest2) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `categories/sub/${id}`, requestOptions)
    }

    async updateSubCategory2(id: string , data: CreateRequest3) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `categories/sub-2/${id}`, requestOptions)
    }

    async clickCategory(id: string) {
      return request('PUT', `banners/click/${id}`, this.options)
    }

    async clickSubCategory(id: string) {
      return request('PUT', `banners/click-sub/${id}`, this.options)
    }

    async clickSubCategory2(id: string) {
      return request('PUT', `banners/click-sub-2/${id}`, this.options)
    }
}
