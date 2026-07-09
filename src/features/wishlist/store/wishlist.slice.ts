import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistProduct, WishlistResponse } from "../types/wishlist.types";
import { getGuestWishlist, setGuestWishlist, clearGuestWishlist } from "@/src/utils/localstorageCartWishlist";

export interface WishlistInitialStateType {
    wishlistProducts: WishlistProduct[];
    wishlistCount: number;
    isLoading: boolean;
    error: string | null;
}


// Try to load from localStorage if not logged in
let guestWishlist: WishlistProduct[] = [];
if (typeof window !== 'undefined') {
    guestWishlist = getGuestWishlist();
}

const initialStateValues: WishlistInitialStateType = {
        wishlistProducts: guestWishlist,
        wishlistCount: guestWishlist.length,
        isLoading: false,
        error: null,
};

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialStateValues,
    reducers: {
        setWishlistInfo: (state, action: PayloadAction<WishlistResponse>) => {
            state.wishlistProducts = action.payload.data;
            state.wishlistCount = action.payload.count;
            state.error = null;
        },
        addProductToWishlist: (state, action: PayloadAction<WishlistProduct>) => {
            const exists = state.wishlistProducts.some(
                (product) => product._id === action.payload._id
            );
            if (!exists) {
                state.wishlistProducts.push(action.payload);
                state.wishlistCount += 1;
                setGuestWishlist(state.wishlistProducts);
            }
        },
        removeProductFromWishlist: (state, action: PayloadAction<string>) => {
            const productIdToRemove = action.payload;
            state.wishlistProducts = state.wishlistProducts.filter(
                (product) => product._id !== productIdToRemove
            );
            state.wishlistCount = state.wishlistProducts.length;
            setGuestWishlist(state.wishlistProducts);
        },
        clearWishlist: (state) => {
            state.wishlistProducts = [];
            state.wishlistCount = 0;
            clearGuestWishlist();
        },
        setWishlistLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setWishlistError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const wishlistReducer = wishlistSlice.reducer;
export const {
    setWishlistInfo,
    addProductToWishlist,
    removeProductFromWishlist,
    clearWishlist,
    setWishlistLoading,
    setWishlistError,
} = wishlistSlice.actions;