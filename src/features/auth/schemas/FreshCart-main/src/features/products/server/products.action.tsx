'use server'

import axios from "axios"
import { AxiosRequestConfig } from "axios"
import { ProductDetailsResponse, ProductsResponse } from "../types/productsResponseType"

export default async function getProducts(): Promise<ProductsResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/products',
            method: 'GET'
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}


export async function getProductById(id: string): Promise<ProductDetailsResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: 'GET'
        }
        const { data } = await axios.request(options)

        return data
    } catch (error) {
        throw error
    }

}

export async function getRelatedProducts(categoryId: string, excludeProductId?: string): Promise<ProductsResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=10`,
            method: 'GET'
        }
        const { data } = await axios.request(options)

        // Filter out the current product if excludeProductId is provided
        if (excludeProductId && data.data) {
            data.data = data.data.filter((product: { _id: string }) => product._id !== excludeProductId)
        }

        return data
    } catch (error) {
        throw error
    }
}

/**
 * Get all products for a specific category
 */
export async function getProductsByCategory(categoryId: string): Promise<ProductsResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
            method: 'GET'
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

/**
 * Get products with filters
 */
export async function getProductsWithFilters(params: {
    category?: string;
    subcategory?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    limit?: number;
    page?: number;
}): Promise<ProductsResponse> {
    try {
        const searchParams = new URLSearchParams()

        if (params.category) searchParams.append('category', params.category)
        if (params.subcategory) searchParams.append('subcategory', params.subcategory)
        if (params.brand) searchParams.append('brand', params.brand)
        if (params.minPrice) searchParams.append('price[gte]', params.minPrice.toString())
        if (params.maxPrice) searchParams.append('price[lte]', params.maxPrice.toString())
        if (params.sort) searchParams.append('sort', params.sort)
        if (params.limit) searchParams.append('limit', params.limit.toString())
        if (params.page) searchParams.append('page', params.page.toString())

        const queryString = searchParams.toString()
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products${queryString ? `?${queryString}` : ''}`,
            method: 'GET'
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}