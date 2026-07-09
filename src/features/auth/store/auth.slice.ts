
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type User={
    name:string,
    email?:string,
    role:string,
    id?:string
}

export type authIntialState ={
    isAuthinticated: boolean,
    userInfo: null | User
}

const initialState:authIntialState ={
    isAuthinticated: false,
    userInfo: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuthInfo: function (state , action:PayloadAction<authIntialState>){
            // 
            state.isAuthinticated = action.payload.isAuthinticated
            state.userInfo = action.payload.userInfo
        }
    }
})

export const authSliceReducer= authSlice.reducer

export const {setAuthInfo}=authSlice.actions