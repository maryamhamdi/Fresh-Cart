"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUserPlus, faEnvelope, faLock, faPhone, faUser, faEye, faEyeSlash, faLeaf, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema, SignupSchemaType } from "../../schemas/signupschema";
import { SignupAction } from "../../server/signup.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)
    const [isCreated, setIsCreated] = useState(false)

    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
            terms: false
        },

        resolver: zodResolver(SignupSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',

    })

    const onSubmit: SubmitHandler<SignupSchemaType> = async (values) => {
        const response = await SignupAction(values)
        if (response?.success) {
            reset()
            toast.success("Your account has been created successfully. Redirecting to sign in...");
            setIsCreated(true)
            setTimeout(() => {
                router.push('/login')
            }, 1200)
            return
        }
        else {
            if (response?.message) {
                toast.error(response.message);
            }
            if (response?.errors) {
                const errors = response.errors;

                Object.keys(errors).forEach((key) => {
                    setError(key as keyof SignupSchemaType, {
                        message: errors[key as keyof typeof errors],
                    });
                });
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

                {isCreated ? (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
                        <div className="mx-auto w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-lg animate-pulse">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-white text-4xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Account Created</h3>
                        <p className="text-gray-600">Redirecting to sign in…</p>
                    </div>
                ) : (
                    <form
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-6 transition-all duration-300 hover:shadow-2xl"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Header */}
                        <header className="text-center space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Account</h2>
                            <p className="text-gray-500">Start your fresh journey with us today</p>
                        </header>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        id="name"
                                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                        {...register('name')}
                                    />
                                </div>
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                            </div>

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
                                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
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
                                        placeholder="Create a strong password"
                                        id="password"
                                        className={`w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
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
                                {errors.password ? (
                                    <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                                ) : (
                                    <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="repassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
                                    </span>
                                    <input
                                        type={showRePassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        id="repassword"
                                        className={`w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${errors.rePassword ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                        {...register('rePassword')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowRePassword(!showRePassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <FontAwesomeIcon icon={showRePassword ? faEyeSlash : faEye} className="h-4 w-4" />
                                    </button>
                                </div>
                                {errors.rePassword && <p className="text-xs text-red-500 mt-1">{errors.rePassword.message}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="+20 123 456 7890"
                                        id="phone"
                                        className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                            }`}
                                        {...register('phone')}
                                    />
                                </div>
                                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3">
                                <input
                                    id="terms"
                                    type='checkbox'
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    {...register('terms')}
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium transition-all duration-300 hover:underline hover:underline-offset-2">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 font-medium transition-all duration-300 hover:underline hover:underline-offset-2">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}
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
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faUserPlus} className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                    <span>Create Account</span>
                                </>
                            )}
                        </button>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-all duration-300 hover:underline hover:underline-offset-2">
                                Sign in
                            </Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    )
}