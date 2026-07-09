'use client'

import { faArrowLeftRotate, faBolt, faCartShopping, faChevronRight, faHeart, faMinus, faPlus, faShare, faShield, faTruck, faCheck, faSpinner, faStar, faCircleCheck, faBoxOpen, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product } from "../types/productsResponseType";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import addToCart, { getCart } from "@/src/features/cart/server/cart.actions";
import { addToWishlist, removeFromWishlist } from "@/src/features/wishlist/server/wishlist.actions";
import { toast } from "react-toastify";
import { setCartInfo } from "@/src/features/cart/store/cart.slice";
import { addProductToWishlist, removeProductFromWishlist } from "@/src/features/wishlist/store/wishlist.slice";
import { useAppDispatch, useAppSelector } from "@/src/store/store";

export default function ProductInfo({ product }: { product: Product }) {
    const dispatch = useAppDispatch();
    const { wishlistProducts } = useAppSelector(state => state.wishlist);

    const { _id, title, description, images, ratingsQuantity, ratingsAverage, price, priceAfterDiscount, quantity, subcategory, brand, category } = product;
    const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;
    const discountPercentage = priceAfterDiscount ? Math.round(((price - priceAfterDiscount) / price) * 100) : 0;
    const isLowStock = quantity < 10 && quantity > 0;
    const isOutOfStock = quantity === 0;

    const [quantityToBuy, setQuantityToBuy] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);

    // Check if product is in wishlist
    const isInWishlist = wishlistProducts.some(p => p._id === _id);

    // Format price with commas
    const formatPrice = (p: number) => p.toLocaleString();

    // Generate star rating
    const fullStars = Math.floor(ratingsAverage);
    const hasHalfStar = ratingsAverage % 1 >= 0.5;

    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        try {
            for (let i = 0; i < quantityToBuy; i++) {
                await addToCart(_id);
            }
            const cartInfo = await getCart();
            dispatch(setCartInfo(cartInfo));
            setIsAddedToCart(true);
            toast.success(`Added ${quantityToBuy} item(s) to cart`);
            setTimeout(() => setIsAddedToCart(false), 2000);
        } catch {
            toast.error('Failed to add product to cart');
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleToggleWishlist = async () => {
        setIsWishlistLoading(true);
        try {
            if (isInWishlist) {
                await removeFromWishlist(_id);
                dispatch(removeProductFromWishlist(_id));
                toast.success('Removed from wishlist');
            } else {
                const response = await addToWishlist(_id);
                if (response.status === 'success') {
                    dispatch(addProductToWishlist(product as any));
                    toast.success('Added to wishlist');
                }
            }
        } catch (error) {
            toast.error('Failed to update wishlist');
        } finally {
            setIsWishlistLoading(false);
        }
    };

    return (
        <section className="bg-gray-50/50 py-4 sm:py-6 lg:py-10">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="hidden sm:flex text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 items-center flex-wrap gap-1">
                    <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-300 mx-1" />
                    <Link href="/categories" className="hover:text-emerald-600 transition-colors">{category.name}</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-300 mx-1" />
                    <Link href="/categories" className="hover:text-emerald-600 transition-colors">{subcategory[0]?.name}</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-300 mx-1" />
                    <span className="text-gray-900 font-medium truncate max-w-[200px]">{title}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
                    {/* Left Column - Image Gallery */}
                    <div className="space-y-3 sm:space-y-4">
                        {/* Main Image */}
                        <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            {/* Badges */}
                            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex flex-col gap-2">
                                {discountPercentage > 0 && (
                                    <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg">
                                        -{discountPercentage}% OFF
                                    </span>
                                )}
                                {isLowStock && (
                                    <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                                        Only {quantity} left!
                                    </span>
                                )}
                            </div>

                            {/* Wishlist & Share Buttons */}
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex flex-col gap-2">
                                <button
                                    onClick={handleToggleWishlist}
                                    disabled={isWishlistLoading}
                                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center transition-all duration-200 ${isInWishlist
                                            ? 'text-rose-500 hover:bg-rose-50'
                                            : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                                        }`}
                                >
                                    {isWishlistLoading ? (
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    ) : (
                                        <FontAwesomeIcon icon={isInWishlist ? faHeart : faHeartRegular} />
                                    )}
                                </button>
                                <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                                    <FontAwesomeIcon icon={faShare} />
                                </button>
                            </div>

                            {/* Main Image Display */}
                            <div className="aspect-square p-6 sm:p-10 lg:p-12">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={images[selectedImage]}
                                        alt={title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border-2 overflow-hidden transition-all ${selectedImage === index
                                                ? 'border-emerald-500 ring-2 ring-emerald-200'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${title} - ${index + 1}`}
                                            fill
                                            className="object-contain p-2"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Category & Brand Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Link href="/categories" className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                                {category.name}
                            </Link>
                            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                {brand.name}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                            {title}
                        </h1>

                        {/* Rating */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        className={`text-sm ${i < fullStars ? 'text-amber-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {ratingsAverage} <span className="text-gray-400">({ratingsQuantity} reviews)</span>
                            </span>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm text-emerald-600 font-medium">{product.sold || 0} Sold</span>
                        </div>

                        {/* Price Section */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-4 sm:p-5">
                            <div className="flex flex-wrap items-baseline gap-3">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                                    {formatPrice(priceAfterDiscount || price)}
                                </span>
                                <span className="text-base sm:text-lg text-gray-500 font-medium">EGP</span>
                                {priceAfterDiscount && (
                                    <>
                                        <span className="text-base sm:text-lg text-gray-400 line-through">
                                            {formatPrice(price)} EGP
                                        </span>
                                        <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-xs font-bold rounded">
                                            Save {formatPrice(price - priceAfterDiscount)} EGP
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Stock Status */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isOutOfStock
                                ? 'bg-red-50 text-red-700'
                                : isLowStock
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-emerald-50 text-emerald-700'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
                                }`}></span>
                            {isOutOfStock
                                ? 'Out of Stock'
                                : isLowStock
                                    ? `Only ${quantity} left - Order soon!`
                                    : 'In Stock'
                            }
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            {description}
                        </p>

                        {/* Quantity Selector */}
                        {!isOutOfStock && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Quantity</label>
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                onClick={() => setQuantityToBuy(Math.max(1, quantityToBuy - 1))}
                                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-l-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                                            >
                                                <FontAwesomeIcon icon={faMinus} className="text-sm" />
                                            </button>
                                            <input
                                                type="number"
                                                className="w-14 sm:w-16 h-10 sm:h-11 text-center border-y border-gray-200 text-gray-900 font-semibold focus:outline-none"
                                                value={quantityToBuy}
                                                onChange={(e) => setQuantityToBuy(Math.max(1, Math.min(quantity, Number(e.target.value))))}
                                                min={1}
                                                max={quantity}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setQuantityToBuy(Math.min(quantity, quantityToBuy + 1))}
                                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-r-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-gray-500 block mb-1">Total Price</span>
                                        <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                                            {formatPrice((priceAfterDiscount || price) * quantityToBuy)} EGP
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart || isOutOfStock}
                                    className={`h-12 sm:h-14 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${isAddedToCart
                                            ? 'bg-emerald-500 text-white shadow-emerald-200'
                                            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-200/70'
                                        }`}
                                >
                                    {isAddingToCart ? (
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    ) : isAddedToCart ? (
                                        <>
                                            <FontAwesomeIcon icon={faCheck} />
                                            <span>Added!</span>
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faCartShopping} />
                                            <span className="hidden sm:inline">Add to Cart</span>
                                            <span className="sm:hidden">Cart</span>
                                        </>
                                    )}
                                </button>
                                <Link
                                    href={''}
                                    className={`h-12 sm:h-14 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all text-sm sm:text-base ${isOutOfStock
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gray-900 hover:bg-gray-800 text-white shadow-gray-300/60'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faBolt} />
                                    <span className="hidden sm:inline">Buy Now</span>
                                    <span className="sm:hidden">Buy</span>
                                </Link>
                            </div>
                            <button
                                type="button"
                                onClick={handleToggleWishlist}
                                disabled={isWishlistLoading}
                                className={`w-full h-11 sm:h-12 rounded-xl border-2 font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${isInWishlist
                                        ? 'border-rose-200 bg-rose-50 text-rose-600'
                                        : 'border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50'
                                    }`}
                            >
                                {isWishlistLoading ? (
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={isInWishlist ? faHeart : faHeartRegular} />
                                        <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
                            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <FontAwesomeIcon icon={faTruck} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-semibold text-gray-800">Free Delivery</p>
                                    <p className="text-[10px] text-gray-500">Over 500 EGP</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <FontAwesomeIcon icon={faArrowLeftRotate} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-semibold text-gray-800">Easy Returns</p>
                                    <p className="text-[10px] text-gray-500">14 Days</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                    <FontAwesomeIcon icon={faShield} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-semibold text-gray-800">Secure Pay</p>
                                    <p className="text-[10px] text-gray-500">100% Safe</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-semibold text-gray-800">Authentic</p>
                                    <p className="text-[10px] text-gray-500">Guaranteed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}