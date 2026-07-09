
import {configureStore}  from "@reduxjs/toolkit"
import { authIntialState, authSliceReducer, User } from "../features/auth/store/auth.slice"
import { cartInitialStateType, cartReducer } from "../features/cart/store/cart.slice";
import { WishlistInitialStateType, wishlistReducer } from "../features/wishlist/store/wishlist.slice";
import { useDispatch, useSelector } from "react-redux";

export type preloadedStateType={
    auth : authIntialState,
    cart : cartInitialStateType,
    wishlist: WishlistInitialStateType
}

export function createStore(preloadedState:preloadedStateType){
    const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    },
    preloadedState

});
    return store

}


export type AppStore =ReturnType<typeof createStore>
export type AppState =ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = () => useDispatch<AppDispatch>()

