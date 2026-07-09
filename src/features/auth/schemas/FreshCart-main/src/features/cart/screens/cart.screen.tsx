'use client'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faBoxOpen, faCartShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CartProductCard from "../components/cartProductCard";
import OrderSummary from "../components/cartSummary";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import Swal from "sweetalert2";
import { clearCartState } from "../store/cart.slice";
import { clearCart } from "../server/cart.actions";
import SecondPromoBanner from "../../home/components/SecondPromoBanner";

export default function CartScreen() {
    const { numOfCartItems, products, cartId, totalCartPrice, totalCartPriceAfterDiscount } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

        const handleClearCart = () => {
            // Implement the logic to clear all items from the cart and show a confirmation dialog and remove all items from the slice and then call the clearCart function to clear the cart in the backend
            Swal.fire({
                title: 'Clear Cart',
                text: 'Are you sure you want to clear all items from your cart?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Clear',
                cancelButtonText: 'Cancel',
                customClass: {
                    confirmButton: 'bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors',
                    cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl transition-colors'
                },
                buttonsStyling: false
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await clearCart()
                        dispatch(clearCartState())
                        Swal.fire({
                            title: 'Cleared!',
                            text: 'Your cart has been cleared.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1200
                        })
                    } catch (error) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to clear the cart.',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1200
                        })
                    }
                }
            })
        }

    return (
        <section className="cart px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Header Section */}
            <header className="mb-6 sm:mb-8" data-aos="fade-down">
                {/* Breadcrumb */}
                <nav className="text-sm mb-4">
                    <Link href="/" className="text-gray-500 hover:text-gray-700">
                        Home
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="font-semibold text-gray-900">Shopping Cart</span>
                </nav>

                {/* Title */}
                <div className="flex items-center gap-3">
                    <span className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-lg sm:text-xl">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                            Shopping Cart
                        </h1>
                        <p className="text-sm text-gray-500">
                            {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"} in your cart
                        </p>
                    </div>
                </div>
            </header>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center" data-aos="zoom-in">
                    {/* Icon */}
                    <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-4xl sm:text-5xl text-gray-400" />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                        Your cart is empty
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 mb-6 max-w-md text-sm sm:text-base px-4">
                        Looks like you haven't added anything to your cart yet. Start exploring our products!
                    </p>

                    {/* Start Shopping Button */}
                    <Link
                        href="/products"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 sm:py-3.5 sm:px-8 rounded-xl transition-colors flex items-center gap-2 text-sm sm:text-base mb-10 sm:mb-12"
                    >
                        Start Shopping
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>

                    {/* Divider */}
                    <hr className="w-full max-w-md border-gray-200 mb-6 sm:mb-8" />

                    {/* Popular Categories */}
                    <p className="text-gray-500 font-medium mb-4 text-sm">Popular Categories</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
                        <Link href="/categories" className="px-4 py-1.5 sm:px-5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                            Electronics
                        </Link>
                        <Link href="/categories" className="px-4 py-1.5 sm:px-5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                            Fashion
                        </Link>
                        <Link href="/categories" className="px-4 py-1.5 sm:px-5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/categories" className="px-4 py-1.5 sm:px-5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                            Beauty
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px] gap-6 lg:gap-8">
                    <div className="space-y-4 sm:space-y-6">
                        {products.map((product, idx) => {
                            // Use product._id if available, otherwise fallback to product.product._id or idx
                            const key = product._id || (product.product && product.product._id) || idx;
                            return (
                                <div key={key} data-aos="fade-up" data-aos-delay={100 + idx * 50}>
                                    <CartProductCard info={product} />
                                </div>
                            );
                        })}
                        {/* Footer Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1 pt-2" data-aos="fade-up" data-aos-delay="300">
                            <Link
                                href="/products"
                                className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                                Continue Shopping
                            </Link>
                            <button
                                onClick={handleClearCart} 
                                type="button"
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <FontAwesomeIcon icon={faTrashCan} className="text-xs" />
                                Clear all items
                            </button>
                        </div>
                    </div>
                    <div className="lg:sticky lg:top-24 lg:self-start" data-aos="fade-left" data-aos-delay="200">
                        <OrderSummary info={{ cartId, totalCartPrice, numOfCartItems, totalCartPriceAfterDiscount }} />
                    </div>
                </div>
            )}

            <SecondPromoBanner  />
        </section>
    );
}