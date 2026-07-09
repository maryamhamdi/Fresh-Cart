import { ReactNode } from "react";
import '../styles/globals.css';
import fav from '../assets/images/mini-logo.png'
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import '../lib/fontawesome'

import { Exo } from "next/font/google"
import Providers from "../components/providers/providers";
import { verifyToken } from "../features/auth/server/auth.action";
import { getCart } from "../features/cart/server/cart.actions";
import { cartInitialStateType } from "../features/cart/store/cart.slice";
import { WishlistInitialStateType } from "../features/wishlist/store/wishlist.slice";
import { getLoggedUserWishlist } from "../features/wishlist/server/wishlist.actions";
const exo = Exo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: "--font-exo"
})

export default async function RouteLayout({ children }: { children: ReactNode }) {

  let cartState: cartInitialStateType = {
    cartId: "",
    numOfCartItems: 0,
    totalCartPrice: 0,
    totalCartPriceAfterDiscount: null,
    products: [],
    error: "",
    isLoading: false,
  };

  let wishlistState: WishlistInitialStateType = {
    wishlistProducts: [],
    wishlistCount: 0,
    isLoading: false,
    error: null,
  };

  const response = await verifyToken()
  if (response.isAuthinticated) {
    try {
      const cartResponse = await getCart();
      cartState = {
        cartId: cartResponse.cartId,
        numOfCartItems: cartResponse.numOfCartItems,
        products: cartResponse.data.products,
        totalCartPrice: cartResponse.data.totalCartPrice,
        totalCartPriceAfterDiscount: cartResponse.data.totalCartPriceAfterDiscount ?? null,
        error: "",
        isLoading: false,
      };
    } catch (error) {

    }

    try {
      const wishlistResponse = await getLoggedUserWishlist();
      wishlistState = {
        wishlistProducts: wishlistResponse.data,
        wishlistCount: wishlistResponse.count,
        isLoading: false,
        error: null,
      };
    } catch (error) {

    }
  }


  return <html lang="en">
    <head>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>FreshCart</title>

      <meta name="description"
        content="FreshCart هو متجر إلكتروني لشراء المنتجات الطازجة والبقالة وكل احتياجاتك اليومية بأفضل الأسعار مع توصيل سريع لباب البيت." />

      <meta name="keywords"
        content="FreshCart, ecommerce, online shopping, groceries, fresh food, سوبر ماركت اونلاين, شراء منتجات" />

      <meta name="author" content="Ziad Elsayed" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content="FreshCart | Fresh Groceries Delivered Fast" />
      <meta property="og:description"
        content="اطلب كل احتياجاتك اليومية أونلاين من FreshCart بأسعار مميزة وتوصيل سريع." />
      <meta property="og:image" content={fav.src} />
      <meta property="og:url" content="" />
      <meta property="og:type" content="website" />

      {/* Twitter  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="FreshCart | Online Grocery Store" />
      <meta name="twitter:description"
        content="تسوق المنتجات الطازجة والبقالة أونلاين بسهولة مع FreshCart." />
      <meta name="twitter:image" content={fav.src} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href={fav.src} />

      {/* Theme color */}
      <meta name="theme-color" content="#22c55e" />



    </head>
    <body className={` ${exo.className}`}>
      <Providers preloadedState={{ auth: response, cart: cartState, wishlist: wishlistState }}>
        <Navbar />
        {children}
        <Footer />
      </Providers>
    </body>
  </html>
}