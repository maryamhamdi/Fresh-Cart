'use server'

import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import { id } from "zod/v4/locales"
import { UserCartResponse } from "../types/userCartTypes"

export default async function addToCart(id: string) {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null

    if (!token) {
        throw new Error('User not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://ecommerce.routemisr.com/api/v1/cart',
            headers: {
                token
            },
            data: {
                productId: id
            }
        }

        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}


export async function getCart(): Promise<UserCartResponse> {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null

    if (!token) {
        throw new Error('User not authenticated')
    }

    try {
        const options: AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/cart',
            method: 'GET',
            headers:{
                token
            }
        }

        const {data} = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}


export async function removeFromCart(id: string): Promise<UserCartResponse> {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null


    try {
        const options: AxiosRequestConfig ={
            url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            method: 'DELETE',
            headers:{
                token
            }
        }
        const {data} = await axios.request(options)
        return data
    } catch(error) {
        throw error
    }
}


export async function updateCartItemQuantity(id: string, count: number): Promise<UserCartResponse> {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null

    if(!token) {
        throw new Error('User not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            method: 'PUT',
            headers: {
                token
            },
            data: {
                count
            }
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
   
}

export async function clearCart(): Promise<{ message: string }> {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null
    if (!token) {
        throw new Error('User not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/cart',
            method: 'DELETE',
            headers: {
                token
            }
        }
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

export async function applyCoupon(couponName: string): Promise<UserCartResponse> {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null

    if (!token) {
        throw new Error('User not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/cart/applyCoupon',
            method: 'PUT',
            headers: {
                token,
                'Content-Type': 'application/json'
            },
            data: {
                couponName
            }
        }
        const { data } = await axios.request(options)
        return data
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw error
    }
}