'use server'

import axios from "axios"
import { AxiosRequestConfig } from "axios"
import { ApiResponse } from "../types/Category.response.type"

export default async function getCategories():Promise<ApiResponse>{
    try {
        const options: AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET',
        }
        const {data}= await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}