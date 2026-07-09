"use client";

import { faSpinner, faEnvelope, faLock, faEye, faEyeSlash, faLeaf, faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SigninSchema, SigninValuesTypes } from "../../schemas/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninAction } from "../../server/signin.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setToken } from "../../server/auth.action";
import { setAuthInfo } from "../../store/auth.slice";
import { useDispatch } from "react-redux";
import { getGuestCart, clearGuestCart, getGuestWishlist, clearGuestWishlist } from "@/src/utils/localstorageCartWishlist";
import addToCart from "@/src/features/cart/server/cart.actions";
import { addToWishlist } from "@/src/features/wishlist/server/wishlist.actions";

export default function SigninForm() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { handleSubmit, register, reset, setError, formState: { errors, isSubmitting } } = useForm<SigninValuesTypes>({
        defaultValues: {
            email: '',
            password: '',
            keepme: false
        },
        resolver: zodResolver(SigninSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });

    const onSubmit: SubmitHandler<SigninValuesTypes> = async (values) => {
        const response = await SigninAction(values)
        if (response?.success) {
            await setToken(response.data.token, values.keepme ?? false)
            dispatch(
                setAuthInfo({ isAuthinticated: true, userInfo: response.data.user })
            )

            // Merge guest cart to user account
            const guestCart = getGuestCart();
            if (guestCart && guestCart.length > 0) {
                for (const item of guestCart) {
                    try {
                        await addToCart(item.product._id);
                    } catch {}
                }
                clearGuestCart();
            }

            // Merge guest wishlist to user account
            const guestWishlist = getGuestWishlist();
            if (guestWishlist && guestWishlist.length > 0) {
                for (const item of guestWishlist) {
                    try {
                        await addToWishlist(item._id);
                    } catch {}
                }
                clearGuestWishlist();
            }

            reset()
            toast.success("Welcome back! You have signed in successfully");
            setIsSuccess(true)
            setTimeout(() => {
                router.push('/')
            }, 1200)
            return
        }
        else {
            if (response?.errors) {
                Object.keys(response?.errors).forEach((key) => {
                    setError(key as keyof SigninValuesTypes, { message: response?.errors[key] })
                })
            }
            if (response?.message) {
                toast.error(response.message)
            }
        }
    }

    return (
        <div className="flex items-center justify-center py-8 px-4">
            <div className="w-full max-w-lg">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-emerald-600 cursor-pointer transition-all duration-300 hover:scale-105 group">
                        <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-200 group-hover:shadow-lg">
                            <FontAwesomeIcon icon={faLeaf} className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                        </div>
                        <span className="text-2xl font-bold">FreshCart</span>
                    </div>
                </div>

                {isSuccess ? (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
                        <div className="mx-auto w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-lg animate-pulse">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-white text-4xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Signed in successfully</h3>
                        <p className="text-gray-600">Redirecting you to the dashboard…</p>
                    </div>
                ) : (
                    <form 
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-6 transition-all duration-300 hover:shadow-2xl" 
                        onSubmit={handleSubmit(onSubmit)}
                    >
                    {/* Header */}
                    <header className="text-center space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back!</h2>
                        <p className="text-gray-500">Sign in to continue your fresh shopping experience</p>
                    </header>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                                </span>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    id="email"
                                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    }`}
                                    {...register('email')} 
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    id="password"
                                    className={`w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    }`}
                                    {...register('password')} 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4" />
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input 
                                    id="keepme"
                                    type='checkbox'
                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    {...register('keepme')} 
                                />
                                <label htmlFor="keepme" className="text-sm text-gray-600">
                                    Keep me signed in
                                </label>
                            </div>
                            <Link 
                                href="/forget-password" 
                                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-all duration-300 hover:underline hover:underline-offset-2"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg group"
                    >
                        {isSubmitting ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                        )}
                    </button>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500">
                        New to FreshCart?{' '}
                        <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-all duration-300 hover:underline hover:underline-offset-2">
                            Create an account
                        </Link>
                    </p>
                </form>
                )}
            </div>
        </div>
    )
}