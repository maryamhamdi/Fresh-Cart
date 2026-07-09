"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faArrowLeft,
    faArrowRight,
    faHeartCrack,
    faTrashCan,
    faSpinner,
    faCartShopping,
    faCheck,

} from "@fortawesome/free-solid-svg-icons";
import { getLoggedUserWishlist, removeFromWishlist } from "../server/wishlist.actions";
import { WishlistProduct, WishlistResponse } from "../types/wishlist.types";
import addToCart, { getCart } from "@/src/features/cart/server/cart.actions";
import { setCartInfo } from "@/src/features/cart/store/cart.slice";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { addProductToCart } from "@/src/features/cart/store/cart.slice";
import { addProductToWishlist, removeProductFromWishlist } from "@/src/features/wishlist/store/wishlist.slice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// Format price with commas
const formatPrice = (value: number) =>
    value.toLocaleString("en-US", { minimumFractionDigits: 0 });


function WishlistScreen() {
    const dispatch = useAppDispatch();
    const cartProducts = useAppSelector((state) => state.cart.products);
    const wishlistProducts = useAppSelector((state) => state.wishlist.wishlistProducts);
    const isAuth = useAppSelector((state) => state.auth.isAuthinticated);

    // استرجاع المنتجات من الريدكس
    const wishlistItems: WishlistProduct[] = wishlistProducts ?? [];

    // Default values for missing states
    const isLoading = false;
    const [error, setError] = useState<unknown>(null);

    const refetch = () => { };

    // Check if product is in cart
    const isInCart = (productId: string) => {
        return cartProducts.some((item) => item.product.id === productId || item.product._id === productId);
    };

    const handleRemoveItem = async (productId: string, productTitle: string) => {
        const result = await Swal.fire({
            html: `
                <div class="flex flex-col items-center py-2">
                    <div class="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900 mb-2">Remove from Wishlist</h2>
                    <p class="text-gray-500 text-center mb-1">Are you sure you want to remove</p>
                    <p class="font-semibold text-gray-800 text-center mb-4">"${productTitle}"</p>
                    <p class="text-sm text-gray-400">from your wishlist?</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Yes, Remove",
            cancelButtonText: "Cancel",
            customClass: {
                popup: "rounded-2xl",
                confirmButton:
                    "bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors",
                cancelButton:
                    "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl transition-colors",
                actions: "gap-3",
            },
            buttonsStyling: false,
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                if (isAuth) {
                    // للمستخدم المسجل: حذف من الداتابيز
                    await removeFromWishlist(productId);
                }
                // في كل الحالات: حذف من الريدكس/localStorage
                dispatch(removeProductFromWishlist(productId));
                Swal.fire({
                    html: `
                        <div class="flex flex-col items-center py-2">
                            <div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                                <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 class="text-xl font-bold text-gray-900 mb-2">Removed!</h2>
                            <p class="text-gray-500 text-center">Item has been removed from your wishlist.</p>
                        </div>
                    `,
                    showConfirmButton: false,
                    timer: 1200,
                    customClass: {
                        popup: "rounded-2xl",
                    },
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to remove item from wishlist.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    const handleAddToCart = async (productId: string) => {
        try {
            const product = wishlistItems.find((item) => item._id === productId);
            if (!product) return;

            // Transform wishlist product to cart product format
            const cartProduct = {
                ...product,
                category: {
                    ...product.category,
                }
            };

            const cartItem = {
                _id: product._id,
                product: cartProduct,
                count: 1,
                price: product.priceAfterDiscount || product.price
            };

            dispatch(addProductToCart(cartItem as any));

            toast.success("Added to cart");
        } catch (error) {
            toast.error("Failed to add product to cart");
        }
    };

    // Loading State
    if (typeof isLoading !== "undefined" && isLoading) {
        return (
            <section className="wishlist px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col items-center justify-center py-24">
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="text-5xl text-emerald-500 animate-spin mb-4"
                    />
                    <p className="text-gray-500 font-medium">Loading your wishlist...</p>
                </div>
            </section>
        );
    }

    // Error State
    if (typeof error !== "undefined" && error) {
        return (
            <section className="wishlist px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="h-20 w-20 rounded-full bg-rose-100 flex items-center justify-center mb-6">
                        <FontAwesomeIcon
                            icon={faHeartCrack}
                            className="text-3xl text-rose-500"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Oops! Something went wrong
                    </h2>
                    {error && (
                        <p className="text-gray-500 mb-6">
                            {error instanceof Error ? error.message : String(error)}
                        </p>
                    )}

                    <button
                        onClick={() => refetch && refetch()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="wishlist px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                </Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-semibold text-gray-900">Wishlist</span>
            </nav>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6" data-aos="fade-down">
                <FontAwesomeIcon icon={faHeart} className="text-2xl text-rose-500" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                    <p className="text-sm text-gray-500">
                        {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
                    </p>
                </div>
            </div>

            {wishlistItems.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 text-center" data-aos="zoom-in">
                    <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                        <FontAwesomeIcon
                            icon={faHeartCrack}
                            className="text-5xl text-gray-400"
                        />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-md">
                        Looks like you haven't added anything to your wishlist yet.
                        <br />
                        Start exploring and save your favorite products!
                    </p>
                    <Link
                        href="/shop"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-8 rounded-xl transition-colors flex items-center gap-2"
                    >
                        Start Shopping
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            ) : (
                <>
                    {/* Table - Desktop */}
                    <div className="hidden md:block bg-gray-50 rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <span className="text-sm font-medium text-gray-500">Product</span>
                            <span className="text-sm font-medium text-gray-500 text-center">Price</span>
                            <span className="text-sm font-medium text-gray-500 text-center">Status</span>
                            <span className="text-sm font-medium text-gray-500 text-center">Actions</span>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-200 bg-white">
                            {wishlistItems.map((product, idx) => (
                                <div
                                    key={product._id}
                                    className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-5 items-center"
                                    data-aos="fade-up"
                                    data-aos-delay={100 + idx * 50}
                                >
                                    {/* Product Info */}
                                    <div className="flex items-center gap-4">
                                        <Link href={`/products/${product._id}`}>
                                            <div className="relative h-20 w-20 rounded-lg border border-gray-200 bg-white overflow-hidden shrink-0">
                                                <Image
                                                    src={product.imageCover}
                                                    alt={product.title}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                        </Link>
                                        <div>
                                            <Link
                                                href={`/products/${product._id}`}
                                                className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-1"
                                            >
                                                {product.title}
                                            </Link>
                                            <p className="text-sm text-gray-500">{product.category.name}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-center">
                                        <span className="font-semibold text-gray-900">
                                            {formatPrice(product.priceAfterDiscount || product.price)} EGP
                                        </span>
                                        {product.priceAfterDiscount && (
                                            <span className="block text-sm text-gray-400 line-through">
                                                {formatPrice(product.price)} EGP
                                            </span>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="flex justify-center">
                                        {isInCart(product._id) ? (
                                            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
                                                <FontAwesomeIcon icon={faCartShopping} className="text-xs" />
                                                In Cart
                                            </span>
                                        ) : product.quantity > 0 ? (
                                            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-sm text-red-500">
                                                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-center gap-2">
                                        {isInCart(product._id) ? (
                                            <Link
                                                href="/cart"
                                                className="inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm px-4 py-2.5 rounded-lg transition-colors"
                                            >
                                                <FontAwesomeIcon icon={faCheck} className="text-xs" />
                                                View Cart
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => handleAddToCart(product._id)}
                                                disabled={product.quantity === 0}
                                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors"
                                            >
                                                <FontAwesomeIcon icon={faCartShopping} className="text-xs" />
                                                Add to Cart
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleRemoveItem(product._id, product.title)}
                                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove from wishlist"
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {wishlistItems.map((product, idx) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                                data-aos="fade-up"
                                data-aos-delay={100 + idx * 50}
                            >
                                {/* Top row: Image, Info, Delete */}
                                <div className="flex gap-4">
                                    <Link href={`/products/${product._id}`}>
                                        <div className="relative h-24 w-24 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shrink-0">
                                            <Image
                                                src={product.imageCover}
                                                alt={product.title}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <Link
                                                    href={`/products/${product._id}`}
                                                    className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2 text-sm"
                                                >
                                                    {product.title}
                                                </Link>
                                                <p className="text-xs text-gray-500 mt-0.5">{product.category.name}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(product._id, product.title)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                                title="Remove from wishlist"
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
                                            </button>
                                        </div>

                                        {/* Price and Status */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div>
                                                <span className="font-bold text-gray-900">
                                                    {formatPrice(product.priceAfterDiscount || product.price)} EGP
                                                </span>
                                                {product.priceAfterDiscount && (
                                                    <span className="ml-2 text-xs text-gray-400 line-through">
                                                        {formatPrice(product.price)} EGP
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                {isInCart(product._id) ? (
                                                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                                        <FontAwesomeIcon icon={faCartShopping} className="text-[10px]" />
                                                        In Cart
                                                    </span>
                                                ) : product.quantity > 0 ? (
                                                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button - Full width */}
                                <div className="mt-4">
                                    {isInCart(product._id) ? (
                                        <Link
                                            href="/cart"
                                            className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm py-2.5 rounded-lg transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faCheck} className="text-xs" />
                                            View Cart
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleAddToCart(product._id)}
                                            disabled={product.quantity === 0}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faCartShopping} className="text-xs" />
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Continue Shopping Link */}
                    <div className="mt-6">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                            Continue Shopping
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
}

export default WishlistScreen;
