'use client'
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faClipboardList,
    faLock,
    faShieldAlt,
    faTruck,
    faRotateLeft,
    faCreditCard,
    faTag
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import ShippingForm from "../component/shipingForm";
import PaymentMethod from "../component/paymentMethod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkOutSchema, shipingAdressValues } from "../schemas/checkOutSchema";
import { useState } from "react";
import { createCacheOrder, createOnlineOrder } from "../server/checkout.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCartState } from "../../cart/store/cart.slice";

const formatPrice = (value: number) =>
    value.toLocaleString("en-US", { minimumFractionDigits: 0 });

export default function CheckoutScreen() {
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
    const router = useRouter();
    const dispatch = useAppDispatch()

    const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm({
        defaultValues: {
            details: '',
            city: '',
            phone: '',
        },

        resolver: zodResolver(checkOutSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    })

    // Debug: watch form values
    const formValues = watch()

    const { totalCartPrice, numOfCartItems, cartId, products, totalCartPriceAfterDiscount } = useAppSelector(state => state.cart);

    const subtotal = totalCartPrice;
    const hasDiscount = totalCartPriceAfterDiscount !== null && totalCartPriceAfterDiscount < subtotal;
    const discountAmount = hasDiscount ? subtotal - totalCartPriceAfterDiscount : 0;
    const priceAfterDiscount = hasDiscount ? totalCartPriceAfterDiscount : subtotal;
    const shipping = priceAfterDiscount >= 500 ? 0 : 100;
    const total = priceAfterDiscount + shipping;


    const onSubmit: SubmitHandler<shipingAdressValues> = async (values) => {
        try {
            if (!cartId) {
                return
            }

            if (paymentMethod === 'cash') {
                // create cache order
                const response = await createCacheOrder({
                    cartId: cartId,
                    shippingAddress: values
                })
                if (response.status === 'success') {
                    dispatch(clearCartState())
                    toast.success('Order created successfully')
                    reset()
                    setTimeout(() => {
                        router.push('/allorders')
                    }, 2000)

                }
            } else {
                // create online order
                const response = await createOnlineOrder({
                    cartId: cartId,
                    shippingAddress: values,
                    url: location.origin
                })
                if(response.status === 'success') {
                    toast.loading('Redirecting to payment gateway')
                    setTimeout(() => {
                        location.href = response.session.url
                    }, 2000)
                }
            }

        } catch (error) {

        }
    }

    return (
        <section className="checkout px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Header Section */}
            <header className="mb-6 sm:mb-8">
                {/* Breadcrumb */}
                <nav className="text-sm mb-4">
                    <Link href="/" className="text-gray-500 hover:text-gray-700">
                        Home
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/cart" className="text-gray-500 hover:text-gray-700">
                        Cart
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="font-semibold text-gray-900">Checkout</span>
                </nav>

                {/* Title and Back Link */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-lg sm:text-xl">
                            <FontAwesomeIcon icon={faClipboardList} />
                        </span>
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                                Complete Your Order
                            </h1>
                            <p className="text-sm text-gray-500">
                                Review and complete your purchase
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/cart"
                        className="hidden sm:flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                        Back to Cart
                    </Link>
                </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px] gap-6 lg:gap-8">
                    {/* Main Content Area - For checkout form */}
                    <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                        {/* Checkout form will go here */}
                        <ShippingForm register={register} errors={errors} setValue={setValue} />

                        {/* choose payment Method */}
                        <PaymentMethod selectedMethod={paymentMethod} changeMethod={setPaymentMethod} />

                        {/* Back to Cart - Mobile only */}
                        <Link
                            href="/cart"
                            className="sm:hidden flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors py-3"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                            Back to Cart
                        </Link>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-6">
                            {/* Header */}
                            <div className="bg-emerald-600 text-white p-4 sm:p-5 lg:p-6">
                                <div className="flex items-center gap-3">
                                    <span className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faLock} className="text-base sm:text-lg" />
                                    </span>
                                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold">Order Summary</h3>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
                                {/* items */}
                                <div className="items max-h-48 sm:max-h-64 overflow-y-auto space-y-2 sm:space-y-3 pr-1">
                                    {products.map((item) => (
                                        <div key={item._id} className="flex items-center gap-2 sm:gap-3 p-2 bg-gray-50 rounded-lg sm:rounded-xl">
                                            <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-white border border-gray-100 overflow-hidden shrink-0">
                                                <Image
                                                    src={item.product.imageCover}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.product.title}</p>
                                                <p className="text-[10px] sm:text-xs text-gray-500">{item.count} × {formatPrice(item.price)} EGP</p>
                                            </div>
                                            <p className="text-xs sm:text-sm font-semibold text-gray-900 shrink-0">
                                                {formatPrice(item.count * item.price)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <hr className="border-gray-200" />
                                {/* Price Details */}
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">{formatPrice(subtotal)} EGP</span>
                                    </div>
                                    {/* Discount Row */}
                                    {hasDiscount && (
                                        <div className="flex items-center justify-between text-sm text-emerald-600">
                                            <div className="flex items-center gap-2">
                                                <FontAwesomeIcon icon={faTag} className="text-xs" />
                                                <span>Promo Discount</span>
                                            </div>
                                            <span className="font-semibold">-{formatPrice(discountAmount)} EGP</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faTruck} className="text-gray-400 text-xs" />
                                            <span>Shipping</span>
                                        </div>
                                        <span className={`font-semibold ${shipping === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                                            {shipping === 0 ? 'FREE' : `${formatPrice(shipping)} EGP`}
                                        </span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <hr className="border-gray-200" />

                                {/* Total */}
                                <div className="flex items-center justify-between">
                                    <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                                    <div className="text-right">
                                        <span className="text-2xl sm:text-3xl font-bold text-emerald-600">{formatPrice(total)}</span>
                                        <span className="text-xs sm:text-sm text-gray-500 ml-1">EGP</span>
                                    </div>
                                </div>

                                {/* Proceed Button */}
                                <button
                                    type="submit"
                                    className={`w-full font-semibold py-3 sm:py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${!cartId ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                                    disabled={!cartId}
                                >
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    Proceed to Payment
                                </button>
                                {!cartId && (
                                    <div className="mt-2 text-center text-red-500 text-sm font-medium">
                                        يجب تسجيل الدخول لإتمام عملية الدفع
                                    </div>
                                )}

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2">
                                    <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500">
                                        <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500" />
                                        <span>Secure</span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500">
                                        <FontAwesomeIcon icon={faTruck} className="text-emerald-500" />
                                        <span>Fast Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500">
                                        <FontAwesomeIcon icon={faRotateLeft} className="text-emerald-500" />
                                        <span>Easy Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}