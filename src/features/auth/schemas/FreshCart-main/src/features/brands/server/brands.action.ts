'use server'

import axios, { AxiosRequestConfig } from "axios"
import { BrandsResponse, BrandResponse } from "../types/brand.types"
import { ProductsResponse } from "@/src/features/products/types/productsResponseType"

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

/**
 * Get all brands
 */
export async function getAllBrands(limit?: number): Promise<BrandsResponse> {
    try {
        const params = limit ? `?limit=${limit}` : ''
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/brands${params}`,
            method: 'GET',
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

/**
 * Get a specific brand by ID
 */
export async function getBrandById(brandId: string): Promise<BrandResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/brands/${brandId}`,
            method: 'GET',
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

/**
 * Get all products for a specific brand
 */
export async function getProductsByBrand(brandId: string): Promise<ProductsResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/products?brand=${brandId}`,
            method: 'GET',
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

/**
 * Search brands by keyword
 */
export async function searchBrands(keyword: string, limit?: number): Promise<BrandsResponse> {
    try {
        const params = new URLSearchParams()
        if (keyword) params.append('keyword', keyword)
        if (limit) params.append('limit', limit.toString())
        
        const queryString = params.toString()
        const options: AxiosRequestConfig = {
            url: `${BASE_URL}/brands${queryString ? `?${queryString}` : ''}`,
            method: 'GET',
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}
