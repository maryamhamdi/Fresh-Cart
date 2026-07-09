'use server'
import { cookies } from "next/headers";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { OrdersResponse } from "../types/ordsers.types";
import { verifyToken } from "../../auth/server/auth.action";

export async function getOrders(): Promise<OrdersResponse> {
    const authState = await verifyToken();
    
    if (!authState.isAuthinticated || !authState.userInfo) {
        throw new Error('User is not authenticated')
    }

    const userId = authState.userInfo.id;

    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
        }
        const {data} = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}