import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, UserCartResponse } from "../types/userCartTypes";
import { getGuestCart, setGuestCart, clearGuestCart } from "@/src/utils/localstorageCartWishlist";

export interface cartInitialStateType {
    numOfCartItems : number,
    cartId : string,
    products: CartItem[],
    totalCartPrice : number,
    totalCartPriceAfterDiscount: number | null,
    isLoading : boolean,
    error: string
}



// Try to load from localStorage if not logged in
let guestProducts: CartItem[] = [];
if (typeof window !== 'undefined') {
    guestProducts = getGuestCart();
}

const initialStateValues:cartInitialStateType ={
        numOfCartItems : guestProducts.length,
        cartId : '',
        products: guestProducts,
        totalCartPrice : 0,
        totalCartPriceAfterDiscount: null,
        isLoading : false,
        error : ''
}



const cartSlice = createSlice({
    name:'cart' ,
    initialState: initialStateValues,
    reducers:{
        setCartInfo: function (state , action:PayloadAction<UserCartResponse>){
            state.cartId = action.payload.cartId
            state.numOfCartItems = action.payload.numOfCartItems
            
            // Preserve existing product quantities (stock) when updating cart
            const existingProductsMap = new Map(
                state.products.map(item => [item.product.id, item.product.quantity])
            );
            
            state.products = action.payload.data.products.map(item => {
                const existingQuantity = existingProductsMap.get(item.product.id);
                // If the new quantity is 0 or undefined but we had a valid quantity before, preserve it
                if ((item.product.quantity === 0 || item.product.quantity === undefined) && existingQuantity && existingQuantity > 0) {
                    return {
                        ...item,
                        product: {
                            ...item.product,
                            quantity: existingQuantity
                        }
                    };
                }
                return item;
            });
            
            state.totalCartPrice = action.payload.data.totalCartPrice
            state.totalCartPriceAfterDiscount = action.payload.data.totalCartPriceAfterDiscount || null
        },
        removeProductFromCart: function (state , action:PayloadAction<string>){
            const productIdToRemove = action.payload
            const removedProduct = state.products.find(item => item.product.id === productIdToRemove)
            if (removedProduct) {
                state.products = state.products.filter(item => item.product.id !== productIdToRemove)
                state.numOfCartItems = state.products.length
                state.totalCartPrice -=removedProduct.price * removedProduct.count
                // Reset discount when cart changes
                state.totalCartPriceAfterDiscount = null
                setGuestCart(state.products);
            }
        },
        clearCartState: function (state) {
            state.numOfCartItems = 0
            state.cartId = ''
            state.products = []
            state.totalCartPrice = 0
            state.totalCartPriceAfterDiscount = null
            clearGuestCart();
        },
        clearDiscount: function (state) {
            state.totalCartPriceAfterDiscount = null
        },
        addProductToCart: function (state, action: PayloadAction<CartItem>) {
            // Only for guest cart
            const exists = state.products.some(item => item.product._id === action.payload.product._id);
            if (!exists) {
                state.products.push(action.payload);
            }
            // Always recalculate totals for guest cart
            state.numOfCartItems = state.products.length;
            state.totalCartPrice = state.products.reduce((sum, item) => sum + item.price * item.count, 0);
            state.totalCartPriceAfterDiscount = null;
            setGuestCart(state.products);
        }
    }
})

export const cartReducer=cartSlice.reducer
export const { setCartInfo , removeProductFromCart, clearCartState, clearDiscount, addProductToCart } = cartSlice.actions