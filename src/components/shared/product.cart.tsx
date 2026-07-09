'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar as faStarSolid,
  faCartPlus,
  faEye,
  faCheck,
  faSpinner,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular, faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import addToCart, { getCart } from "@/src/features/cart/server/cart.actions";
import { addToWishlist, removeFromWishlist } from "@/src/features/wishlist/server/wishlist.actions";
import { getGuestCart, setGuestCart } from "@/src/utils/localstorageCartWishlist";
import { getGuestWishlist, setGuestWishlist } from "@/src/utils/localstorageCartWishlist";
import { toast } from "react-toastify";
import { setCartInfo, addProductToCart } from "@/src/features/cart/store/cart.slice";
import { addProductToWishlist, removeProductFromWishlist } from "@/src/features/wishlist/store/wishlist.slice";
import { useAppDispatch, useAppSelector } from "@/src/store/store";

interface ProductInfo {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number | null;
  ratingsAverage: number;
  ratingsQuantity: number;
  description?: string;
  category: {
    name: string;
  };
  brand?: {
    name: string;
  };
}

interface ProductCardProps {
  productInfo: ProductInfo;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ productInfo, viewMode = 'grid' }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { wishlistProducts } = useAppSelector(state => state.wishlist);
  const isAuth = useAppSelector(state => state.auth.isAuthinticated);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const {
    _id,
    title,
    imageCover,
    price,
    category,
    ratingsAverage,
    ratingsQuantity,
    priceAfterDiscount,
    description,
    brand
  } = productInfo;

  // Check if product is in wishlist
  const isInWishlist = wishlistProducts.some(product => product._id === _id);

  let discount;

  if (priceAfterDiscount) {
    discount = Math.round(((price - priceAfterDiscount) / price) * 100);
  } else {
    discount = null;
  }

  // Generate star rating
  const fullStars = Math.floor(ratingsAverage);
  const hasHalfStar = ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Format price with commas
  const formatPrice = (p: number) => p.toLocaleString();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      if (isAuth) {
        const response = await addToCart(_id);
        if (response.status === 'success') {
          const cartInfo = await getCart();
          dispatch(setCartInfo(cartInfo));
          setIsAddedToCart(true);
          setTimeout(() => setIsAddedToCart(false), 2000);
        } else {
          toast.error('Failed to add product to cart');
        }
      } else {
        // Guest: save to localStorage and slice
        const guestCart = getGuestCart();
        const exists = guestCart.some((item: any) => item.product._id === _id);
        if (!exists) {
          const cartItem = {
            _id,
            product: {
              ...productInfo,
              id: _id,
              quantity: 1,
              subcategory: [productInfo.category.name]
            },
            count: 1,
            price: priceAfterDiscount || price
          };

          guestCart.push(cartItem);
          setGuestCart(guestCart);
          dispatch(addProductToCart(cartItem as any));
          setIsAddedToCart(true);
          setTimeout(() => setIsAddedToCart(false), 2000);
          toast.success('Added to cart (guest)');
        } else {
          toast.info('Already in cart');
        }
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    setIsWishlistLoading(true);
    try {
      if (isAuth) {
        if (isInWishlist) {
          await removeFromWishlist(_id);
          dispatch(removeProductFromWishlist(_id));
          toast.success('Removed from wishlist');
        } else {
          const response = await addToWishlist(_id);
          if (response.status === 'success') {
            dispatch(addProductToWishlist(productInfo as any));
            toast.success('Added to wishlist');
          }
        }
      } else {
        // Guest: save to localStorage and slice
        const guestWishlist = getGuestWishlist();
        const exists = guestWishlist.some((item: ProductInfo) => item._id === _id);
        if (isInWishlist || exists) {
          // Remove from guest wishlist
          const updated = guestWishlist.filter((item: ProductInfo) => item._id !== _id);
          setGuestWishlist(updated);
          dispatch(removeProductFromWishlist(_id));
          toast.success('Removed from wishlist');
        } else {
          guestWishlist.push(productInfo);
          setGuestWishlist(guestWishlist);
          dispatch(addProductToWishlist(productInfo as any));
          toast.success('Added to wishlist (guest)');
        }
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setIsWishlistLoading(false);
    }
  };

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="group relative bg-[#e6e6e6] rounded-2xl overflow-hidden
        shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
        hover:shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]
        hover:-translate-y-1 transform transition-all duration-300">
        <div className="flex flex-col sm:flex-row">
          {/* Image Container */}
          <div className="relative shrink-0 sm:w-48 md:w-56 lg:w-64">
            {/* Badges Container */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {discount && (
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              disabled={isWishlistLoading}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-[#e6e6e6] flex items-center justify-center transition z-10 disabled:opacity-50
                shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                hover:shadow-[inset_2px_2px_6px_#c5c5c5,inset_-2px_-2px_6px_#ffffff]
                ${isInWishlist ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlistLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="text-sm animate-spin" />
              ) : (
                <FontAwesomeIcon icon={isInWishlist ? faHeart : faHeartRegular} className="text-sm" />
              )}
            </button>

            {/* Product Image */}
            <Link href={`/products/${_id}`} className="block p-4 sm:p-6">
              <div className="relative aspect-square sm:h-40 md:h-44 lg:h-48 w-full bg-[#e6e6e6] rounded-xl
                shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]">
                <Image
                  src={imageCover}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, 256px"
                  className="object-contain p-3 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
            <div>
              {/* Category & Brand */}
              <div className="flex items-center gap-3 flex-wrap">
                <Link href={`/categories`}>
                  <span className="inline-block text-xs text-emerald-600 font-semibold uppercase tracking-wide hover:text-emerald-700 transition-colors">
                    {category.name}
                  </span>
                </Link>
                {brand?.name && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">
                      {brand.name}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <Link href={`/products/${_id}`}>
                <h3 className="mt-2 text-gray-800 font-bold text-base sm:text-lg hover:text-emerald-600 transition-colors leading-snug line-clamp-2 text-left">
                  {title.trim()}
                </h3>
              </Link>

              {/* Description */}
              {description && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-2 hidden sm:block">
                  {description}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">
                  {[...Array(fullStars)].map((_, i) => (
                    <FontAwesomeIcon
                      key={`full-${i}`}
                      icon={faStarSolid}
                      className="text-yellow-400 text-xs"
                    />
                  ))}
                  {hasHalfStar && (
                    <FontAwesomeIcon
                      icon={faStarSolid}
                      className="text-yellow-400 text-xs"
                    />
                  )}
                  {[...Array(emptyStars)].map((_, i) => (
                    <FontAwesomeIcon
                      key={`empty-${i}`}
                      icon={faStarRegular}
                      className="text-gray-300 text-xs"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  ({ratingsQuantity})
                </span>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300/60">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    {formatPrice(priceAfterDiscount || price)}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">EGP</span>
                </div>
                {priceAfterDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(price)} EGP
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Quick View Button */}
                <Link
                  href={`/products/${_id}`}
                  className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl bg-[#e6e6e6] text-gray-600 hover:text-emerald-600 transition
                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                    hover:shadow-[inset_2px_2px_6px_#c5c5c5,inset_-2px_-2px_6px_#ffffff]"
                  aria-label="View details"
                >
                  <FontAwesomeIcon icon={faEye} className="text-base" />
                </Link>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium bg-emerald-500 transition disabled:opacity-70
                    shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]
                    hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2),inset_-2px_-2px_6px_rgba(255,255,255,1)]"
                  aria-label="Add to cart"
                >
                  {isAddingToCart ? (
                    <FontAwesomeIcon icon={faSpinner} className="text-sm animate-spin" />
                  ) : isAddedToCart ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} className="text-sm" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faBagShopping} className="text-sm" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (Default)
  return (
    <div className="group relative bg-[#e6e6e6] rounded-2xl overflow-hidden p-4
      shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
      hover:shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]
      hover:-translate-y-1 transform transition-all duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {/* Badges Container */}
        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 z-10 flex flex-col gap-1.5">
          {/* Discount Badge */}
          {discount && (
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button - Always visible */}
        <button
          onClick={handleToggleWishlist}
          disabled={isWishlistLoading}
          className={`absolute top-1 sm:top-2 right-1 sm:right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#e6e6e6] flex items-center justify-center transition z-10 disabled:opacity-50
            shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
            hover:shadow-[inset_2px_2px_6px_#c5c5c5,inset_-2px_-2px_6px_#ffffff]
            ${isInWishlist ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlistLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="text-xs sm:text-sm animate-spin" />
          ) : (
            <FontAwesomeIcon icon={isInWishlist ? faHeart : faHeartRegular} className="text-xs sm:text-sm" />
          )}
        </button>

        {/* Product Image */}
        <Link href={`/products/${_id}`} className="block">
          <div className="relative aspect-square bg-[#e6e6e6] rounded-xl p-4 mb-3
            shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]">
            <Image
              src={imageCover}
              alt={title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div>
        {/* Title */}
        <Link href={`/products/${_id}`}>
          <h3 className="text-gray-800 font-bold text-sm sm:text-base line-clamp-2 hover:text-emerald-600 transition-colors leading-snug min-h-10 sm:min-h-12 text-left">
            {title.trim()}
          </h3>
        </Link>

        {/* Category */}
        <Link href={`/categories`}>
          <span className="inline-block mt-1 text-[10px] sm:text-xs text-emerald-600 font-semibold uppercase tracking-wide hover:text-emerald-700 transition-colors">
            {category.name}
          </span>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2">
          <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
              <FontAwesomeIcon
                key={`full-${i}`}
                icon={faStarSolid}
                className="text-yellow-400 text-[10px] sm:text-xs"
              />
            ))}
            {hasHalfStar && (
              <FontAwesomeIcon
                icon={faStarSolid}
                className="text-yellow-400 text-[10px] sm:text-xs"
              />
            )}
            {[...Array(emptyStars)].map((_, i) => (
              <FontAwesomeIcon
                key={`empty-${i}`}
                icon={faStarRegular}
                className="text-gray-300 text-[10px] sm:text-xs"
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500">
            ({ratingsQuantity})
          </span>
        </div>

        {/* خط */}
        <div className="border-t border-gray-300/60 my-3"></div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                {formatPrice(priceAfterDiscount || price)}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 font-medium">EGP</span>
            </div>
            {priceAfterDiscount && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                {formatPrice(price)} EGP
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm font-medium bg-emerald-500 transition disabled:opacity-70
              shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]
              hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2),inset_-2px_-2px_6px_rgba(255,255,255,1)]"
            aria-label="Add to cart"
          >
            {isAddingToCart ? (
              <FontAwesomeIcon icon={faSpinner} className="text-xs sm:text-sm animate-spin" />
            ) : isAddedToCart ? (
              <>
                <FontAwesomeIcon icon={faCheck} className="text-xs sm:text-sm" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faBagShopping} className="text-xs sm:text-sm" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}