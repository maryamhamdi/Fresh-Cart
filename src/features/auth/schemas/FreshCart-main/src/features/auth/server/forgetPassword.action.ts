'use server'

import axios, { AxiosRequestConfig } from "axios"

export default async function forgetPassword(email: string) {
    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
            data: { 
                email
         }
        }
        const response = await axios.request(options)
        return response.data
    } catch (error: any) {
        throw error
    }
}

export async function verfiyRestCode(resetCode: string) {
    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
            data: { 
                resetCode
         }
        }
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function resetPassword(email: string, newPassword: string) {
    try {
        const options: AxiosRequestConfig = {
            method: 'PUT',
            url: 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
            data: { 
                email,
                newPassword
            }
        }
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        throw error
    }
}