import request from '../../../api'
import { Options } from '../../../api/DataSchemas'
import { PaginationOption } from '../../GlobalDataSchemas'
import { CreateRequest, PaginationOptionProduct } from '../utils/DataSchemas'

function getPaginationQuery(paginationOption: PaginationOptionProduct) {
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

    if (typeof paginationOption.approved !== "undefined") {
      query += `&approved=${paginationOption.approved}`
    }

    if (typeof paginationOption.new !== "undefined") {
      query += `&new=${paginationOption.new}`
    }

    if (typeof paginationOption.cancelled !== "undefined") {
      query += `&cancelled=${paginationOption.cancelled}`
    }

    if (typeof paginationOption.archived !== "undefined") {
      query += `&archived=${paginationOption.archived}`
    }

    if (typeof paginationOption.sellerId !== "undefined") {
      query += `&sellerId=${paginationOption.sellerId}`
    }

    if (typeof paginationOption.categoryId !== "undefined") {
      query += `&categoryId=${paginationOption.categoryId}`
    }

    if (typeof paginationOption.category2Id !== "undefined") {
      query += `&category2Id=${paginationOption.category2Id}`
    }

    if (typeof paginationOption.category3Id !== "undefined") {
      query += `&category3Id=${paginationOption.category3Id}`
    }

    if (typeof paginationOption.min !== "undefined") {
      query += `&min=${paginationOption.min}`
    }

    if (typeof paginationOption.max !== "undefined") {
      query += `&max=${paginationOption.max}`
    }

    if (typeof paginationOption.rating !== "undefined") {
      query += `&rating=${paginationOption.rating}`
    }

    if (typeof paginationOption.search !== "undefined") {
      query += `&search=${paginationOption.search}`
    }

    return query
  }

export default class Service {
    options: Options

    constructor(options: Options) {
        this.options = options
    }
    async createProduct(data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('POST', `products`, requestOptions)
    }

    async getProducts(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `products/${query}`, this.options)
    }

    async getAllProducts(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `products/all${query}`, this.options)
    }

    async getBestProducts(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `products/best${query}`, this.options)
    }

    async getRelativeProducts(paginationOption: PaginationOption, id: string) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `products/relative/${id}${query}`, this.options)
    }

    async getAllProductsGroupByCategories(paginationOption: PaginationOption) {
      const query = getPaginationQuery(paginationOption)
      return request('GET', `products/categories${query}`, this.options)
    }

    async getProductById(id: string) {
      return request('GET', `products/id/${id}`, this.options)
    }


    async updateProduct(id: string , data: CreateRequest) {
      const requestOptions: Options = {
        ...this.options,
        data: data
      }
    
      return request('PATCH', `products/${id}`, requestOptions)
    }

    async likeProduct(id: string) {
      return request('PUT', `products/like/${id}`, this.options)
    }

    async commentProduct(id: string) {
      return request('PUT', `products/comment/${id}`, this.options)
    }

    async viewProduct(id: string) {
      return request('PUT', `products/view/${id}`, this.options)
    }
    async viewProductAuth(id: string) {
      return request('PUT', `products/view-auth/${id}`, this.options)
    }
}
