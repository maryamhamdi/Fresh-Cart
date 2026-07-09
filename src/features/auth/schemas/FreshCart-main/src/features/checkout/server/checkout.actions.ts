
'use server'
import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import { shipingAdressValues } from "../schemas/checkOutSchema"



export  async function createCacheOrder({cartId, shippingAddress}: {cartId: string, shippingAddress: shipingAdressValues}) {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null
    
    if(!token){
        throw new Error('User not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            headers: {
                token
            },
            data: {
                shippingAddress
            }
    }
    const { data } = await axios.request(options)
    return data
}
catch (error) {
   throw error
}
}


export  async function createOnlineOrder({cartId, shippingAddress ,url}: {cartId: string, shippingAddress: shipingAdressValues ,url:string}) {
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null
    
    if(!token){
        throw new Error('User not authenticated')
    }

    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            headers: {
                token
            },
            data: {
                shippingAddress
            }
    }
    const { data } = await axios.request(options)
    return data
}
catch (error) {
   throw error
}
}