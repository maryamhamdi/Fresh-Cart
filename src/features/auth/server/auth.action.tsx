'use server'
import { cookies } from "next/headers";
import { authIntialState } from "../store/auth.slice";
import axios from "axios";
import { AxiosRequestConfig } from "axios";


export  async function setToken(token:string , keepme:boolean):Promise<void> {
    const cookieStore= await cookies()
    if(keepme){
        cookieStore.set( 'token' , token , {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 
    })
    }else{
        cookieStore.set( 'token' , token , {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 
    })
    }   
}

export  async function getToken():Promise<string|null>{
    const cookieStore= await cookies()
    const token =cookieStore.get('token')?.value || null
    return token
}

export async function deleteToken():Promise<void>{
    const cookieStore= await cookies()
    cookieStore.delete('token')
}

export async function verifyToken():Promise<authIntialState>{
    const cookieStore=await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        return{
            isAuthinticated:false,
            userInfo: null
        }
    }

    try {
        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
            method: 'GET',
            headers: {
                token
            }
        }
        const {data}=await axios.request(options)
        if(data.message === 'verified'){
            const {name , id , role} = data.decoded
            return{
                isAuthinticated: true,
                userInfo:{
                    name,
                    id,
                    role
                }
            }
        }

        return{
            isAuthinticated:false,
            userInfo: null
        }
    } catch (error) {
        return{
            isAuthinticated:false,
            userInfo: null
        }
    }
}