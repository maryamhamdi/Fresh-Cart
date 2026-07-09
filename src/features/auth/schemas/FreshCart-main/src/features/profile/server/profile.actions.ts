'use server'
import axios, { AxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'
import { AddressFormData, AddressesResponse, SingleAddressResponse } from '../types/address.types'

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/addresses'

async function getToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null
    if (!token) {
        throw new Error('User is not authenticated')
    }
    return token
}

/**
 * Get all addresses for logged user
 */
export async function getUserAddresses(): Promise<AddressesResponse> {
    const token = await getToken()
    
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: BASE_URL,
            headers: { token }
        }
        const { data } = await axios(options)
        return data
    } catch (error) {
        throw error
    }
}

/**
 * Get specific address by ID
 */
export async function getAddressById(addressId: string): Promise<SingleAddressResponse> {
    const token = await getToken()
    
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `${BASE_URL}/${addressId}`,
            headers: { token }
        }
        const { data } = await axios(options)
        return data
    } catch (error) {
        throw error
    }
}

/**
 * Add new address
 */
export async function addAddress(addressData: AddressFormData): Promise<AddressesResponse> {
    const token = await getToken()
    
    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: BASE_URL,
            headers: { token },
            data: addressData
        }
        const { data } = await axios(options)
        return data
    } catch (error) {
        throw error
    }
}

/**
 * Remove address by ID
 */
export async function removeAddress(addressId: string): Promise<AddressesResponse> {
    const token = await getToken()
    
    try {
        const options: AxiosRequestConfig = {
            method: 'DELETE',
            url: `${BASE_URL}/${addressId}`,
            headers: { token }
        }
        const { data } = await axios(options)
        return data
    } catch (error) {
        throw error
    }
}
