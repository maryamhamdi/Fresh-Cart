'use client';

import { ReactNode, useRef, useEffect } from "react";
import { AppStore, createStore, preloadedStateType } from "../../store/store";
import { setCartInfo, addProductToCart } from "@/src/features/cart/store/cart.slice";
import { setWishlistInfo, addProductToWishlist } from "@/src/features/wishlist/store/wishlist.slice";
import { getGuestCart, getGuestWishlist } from "@/src/utils/localstorageCartWishlist";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

type providerProps = {
    children: ReactNode,
    preloadedState: preloadedStateType
}

export default function Providers({ children, preloadedState }: providerProps) {
    const storeRef = useRef<null | AppStore>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("aos").then(AOS => {
                AOS.init({ once: true, duration: 700 });
            });

            // مزامنة بيانات localStorage مع الريدكس عند أول تحميل
            const syncGuestData = () => {
                const store = storeRef.current;
                if (store) {
                    const state = store.getState();
                    if (!state.auth.isAuthinticated) {
                        // Cart
                        const guestCart = getGuestCart();
                        if (guestCart && guestCart.length > 0) {
                            guestCart.forEach((item: any) => store.dispatch(addProductToCart(item)));
                        }
                        // Wishlist
                        const guestWishlist = getGuestWishlist();
                        if (guestWishlist && guestWishlist.length > 0) {
                            guestWishlist.forEach((item: any) => store.dispatch(addProductToWishlist(item)));
                        }
                    }
                }
            };
            syncGuestData();

            // إضافة مستمع لتحديث الريدكس عند أي تغيير في localStorage (حتى من تاب آخر)
            const handleStorage = (event: StorageEvent) => {
                if (event.key === 'wishlist-guest' || event.key === 'cart-guest') {
                    syncGuestData();
                }
            };
            window.addEventListener('storage', handleStorage);
            return () => {
                window.removeEventListener('storage', handleStorage);
            };
        }
    }, []);

    if (!storeRef.current) {
        storeRef.current = createStore(preloadedState);
    }

    return (
        <Provider store={storeRef.current}>
            {children}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </Provider>
    );
}