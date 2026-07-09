'use server'
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'

export async function addToWishlist(productId: string) {
    const cookiieStore = await cookies()
    const token =  cookiieStore.get('token')?.value || null

    if(!token) {
        throw new Error('User is not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
            headers: {
                token
            },
            data: {
                productId
            }
        }

        const { data } = await axios(options)
        return data
    } catch (error) {
        throw error
    }
}


export async function removeFromWishlist(productId: string) {
    const cookiieStore = await cookies()
    const token =  cookiieStore.get('token')?.value || null

    if(!token) {
        throw new Error('User is not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            method: 'DELETE',
            url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            headers: {
                token
            },
        }

        const { data } = await axios(options)
        return data
    } catch (error) {
        throw error
    }
}

export async function getLoggedUserWishlist() {
    const cookiieStore = await cookies()
    const token =  cookiieStore.get('token')?.value || null

    if(!token) {
        throw new Error('User is not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
            headers: {
                token
            },
        }

        const { data } = await axios(options)
        return data
    } catch (error) {
        throw error
    }
}