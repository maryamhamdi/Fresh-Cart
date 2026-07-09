"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashCan,
    faCheck,
    faCartPlus,
    faStar,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { WishlistProduct } from "../types/wishlist.types";
import { removeFromWishlist } from "../server/wishlist.actions";
import addToCart, { getCart } from "@/src/features/cart/server/cart.actions";
import { setCartInfo } from "@/src/features/cart/store/cart.slice";
import { useAppDispatch } from "@/src/store/store";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const formatPrice = (value: number) =>
    value.toLocaleString("en-US", { minimumFractionDigits: 0 });

interface WishlistItemCardProps {
    product: WishlistProduct;
    onRemove: (productId: string) => void;
}

export default function WishlistItemCard({ product, onRemove }: WishlistItemCardProps) {
    const dispatch = useAppDispatch();
    const {
        _id,
        title,
        imageCover,
        price,
        priceAfterDiscount,
        category,
        quantity,
        ratingsAverage,
        ratingsQuantity,
    } = product;

    // Calculate discount percentage
    const discount = priceAfterDiscount
        ? Math.round(((price - priceAfterDiscount) / price) * 100)
        : null;

    // Generate star rating
    const fullStars = Math.floor(ratingsAverage);
    const hasHalfStar = ratingsAverage % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const handleRemove = async () => {
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
                    <p class="font-semibold text-gray-800 text-center mb-4">"${title}"</p>
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
                await removeFromWishlist(_id);
                onRemove(_id);
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
            } catch {
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

    const handleAddToCart = async () => {
        try {
            const response = await addToCart(_id);
            if (response.status === "success") {
                const cartInfo = await getCart();
                dispatch(setCartInfo(cartInfo));
                toast.success("Added to cart successfully!");
            } else {
                throw new Error();
            }
        } catch {
            toast.error("Failed to add product to cart");
        }
    };

    return (
        <article className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row gap-5 shadow hover:shadow-md transition-shadow">
            {/* Left: Image & Stock Badge */}
            <div className="flex flex-col items-center gap-3 shrink-0">
                <Link href={`/products/${_id}`} className="relative">
                    <div className="relative h-36 w-36 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 hover:border-emerald-200 transition-colors">
                        <Image
                            src={imageCover}
                            alt={title}
                            fill
                            className="object-contain p-2"
                        />
                        {/* Discount Badge */}
                        {discount && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                -{discount}%
                            </span>
                        )}
                    </div>
                </Link>
                <span
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        quantity > 0
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-100 text-rose-600"
                    }`}
                >
                    {quantity > 0 && (
                        <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                    )}
                    {quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
            </div>

            {/* Middle: Product Info */}
            <div className="flex-1 space-y-3">
                <Link href={`/products/${_id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug hover:text-emerald-600 transition-colors line-clamp-2">
                        {title}
                    </h3>
                </Link>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                        {category?.name || "Category"}
                    </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                        {[...Array(fullStars)].map((_, i) => (
                            <FontAwesomeIcon
                                key={`full-${i}`}
                                icon={faStar}
                                className="text-amber-400 text-sm"
                            />
                        ))}
                        {hasHalfStar && (
                            <FontAwesomeIcon
                                icon={faStarHalfStroke}
                                className="text-amber-400 text-sm"
                            />
                        )}
                        {[...Array(emptyStars)].map((_, i) => (
                            <FontAwesomeIcon
                                key={`empty-${i}`}
                                icon={faStarEmpty}
                                className="text-amber-400 text-sm"
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">
                        {ratingsAverage.toFixed(1)} ({ratingsQuantity} reviews)
                    </span>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline gap-3">
                    {priceAfterDiscount ? (
                        <>
                            <span className="text-xl font-bold text-emerald-600">
                                {formatPrice(priceAfterDiscount)} EGP
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                                {formatPrice(price)} EGP
                            </span>
                        </>
                    ) : (
                        <span className="text-xl font-bold text-emerald-600">
                            {formatPrice(price)} EGP
                        </span>
                    )}
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={quantity === 0}
                    type="button"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500"
                >
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span className="hidden sm:inline">Add to Cart</span>
                </button>

                {/* Remove Button */}
                <button
                    onClick={handleRemove}
                    type="button"
                    className="h-11 w-11 rounded-xl flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                    aria-label="Remove from wishlist"
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </article>
    );
}
