'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgetPasswordSchema } from "../schemas/forgetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faArrowLeft,
    faShieldHalved,
    faLock,
    faCheckCircle,
    faSpinner,
    faKey,
    faUserShield,
    faClock
} from "@fortawesome/free-solid-svg-icons";
import forgetPassword from "../server/forgetPassword.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ForgetPasswordScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(forgetPasswordSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });

    const emailValue = watch('email');

    const onSubmit = async (data: { email: string }) => {
        setIsLoading(true);
        try {
            const response = await forgetPassword(data.email);
            toast.success(response.message || 'Reset code sent to your email!');
            setIsEmailSent(true);
            // Store email in sessionStorage for reset password page
            sessionStorage.setItem('resetEmail', data.email);
            // Redirect to verify code page after 2 seconds
            setTimeout(() => {
                router.push('/verify-code');
            }, 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Failed to send reset code. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-[#e6e6e6]">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">

                    {/* Left Side - Hero Section */}
                    <div className="hidden lg:flex flex-col items-center justify-center p-8 xl:p-12">
                        {/* Illustration */}
                        <div className="relative mb-8">
                            <div className="w-64 h-64 xl:w-80 xl:h-80 bg-[#e6e6e6] rounded-full flex items-center justify-center
                                shadow-[12px_12px_24px_#c5c5c5,-12px_-12px_24px_#ffffff]">
                                <FontAwesomeIcon icon={faKey} className="text-emerald-600 text-7xl xl:text-8xl" />
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#e6e6e6] rounded-2xl flex items-center justify-center
                                shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                                <FontAwesomeIcon icon={faShieldHalved} className="text-amber-500 text-2xl" />
                            </div>
                            <div className="absolute -bottom-2 -left-6 w-14 h-14 bg-[#e6e6e6] rounded-xl flex items-center justify-center
                                shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                                <FontAwesomeIcon icon={faLock} className="text-blue-500 text-xl" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center max-w-md">
                            <h2 className="text-2xl xl:text-3xl font-bold text-gray-800 mb-4">
                                Password Recovery Made Easy
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Don't worry! It happens to the best of us. Enter your email and we'll send you a secure link to reset your password.
                            </p>

                            {/* Trust Features */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center p-4 bg-[#e6e6e6] rounded-2xl
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                                    <div className="w-10 h-10 bg-[#e6e6e6] rounded-full flex items-center justify-center mb-2
                                        shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                        <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">Secure Process</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-[#e6e6e6] rounded-2xl
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                                    <div className="w-10 h-10 bg-[#e6e6e6] rounded-full flex items-center justify-center mb-2
                                        shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                        <FontAwesomeIcon icon={faClock} className="text-blue-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">Quick Reset</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-[#e6e6e6] rounded-2xl
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                                    <div className="w-10 h-10 bg-[#e6e6e6] rounded-full flex items-center justify-center mb-2
                                        shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                        <FontAwesomeIcon icon={faUserShield} className="text-amber-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">Privacy First</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form Section */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md">
                            {/* Back Link */}
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 group"
                            >
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="text-sm group-hover:-translate-x-1 transition-transform"
                                />
                                <span className="text-sm font-medium">Back to Sign In</span>
                            </Link>

                            {/* Card */}
                            <div className="bg-[#e6e6e6] rounded-3xl p-6 sm:p-8 lg:p-10
                                shadow-[10px_10px_20px_#c5c5c5,-10px_-10px_20px_#ffffff]">
                                {!isEmailSent ? (
                                    <>
                                        {/* Header */}
                                        <div className="text-center mb-8">
                                            <div className="w-16 h-16 bg-[#e6e6e6] rounded-2xl flex items-center justify-center mx-auto mb-4
                                                shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                                                <FontAwesomeIcon icon={faLock} className="text-emerald-600 text-2xl" />
                                            </div>
                                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                                                Forgot Password?
                                            </h1>
                                            <p className="text-gray-500 text-sm sm:text-base">
                                                No worries, we'll send you reset instructions
                                            </p>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                            {/* Email Field */}
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                                >
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            className={`text-sm ${errors.email ? 'text-red-400' : 'text-gray-400'}`}
                                                        />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        {...register("email")}
                                                        className={`w-full pl-11 pr-4 py-3.5 bg-[#e6e6e6] rounded-xl focus:outline-none transition-all text-gray-800 placeholder:text-gray-400
                                                            shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]
                                                            ${errors.email ? 'ring-2 ring-red-300' : ''}`}
                                                        placeholder="Enter your email address"
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-[#e6e6e6] text-emerald-700 font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2
                                                    shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
                                                    active:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                        <span>Sending...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faEnvelope} />
                                                        <span>Send Reset Link</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {/* Divider */}
                                        <div className="relative my-8">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300/60"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-[#e6e6e6] px-4 text-sm text-gray-400">or</span>
                                            </div>
                                        </div>

                                        {/* Alternative Options */}
                                        <div className="space-y-3">
                                            <Link
                                                href="/login"
                                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-gray-700 font-medium bg-[#e6e6e6] transition-all
                                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                                                    active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                                            >
                                                <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                                                <span>Return to Sign In</span>
                                            </Link>
                                            <p className="text-center text-sm text-gray-500">
                                                Don't have an account?{' '}
                                                <Link href="/signup" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                                                    Sign Up
                                                </Link>
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    /* Success State */
                                    <div className="text-center py-6">
                                        <div className="w-20 h-20 bg-[#e6e6e6] rounded-full flex items-center justify-center mx-auto mb-6
                                            shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-600 text-4xl" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                            Check Your Email
                                        </h2>
                                        <p className="text-gray-500 mb-2">
                                            We've sent a password reset link to
                                        </p>
                                        <p className="text-emerald-600 font-semibold mb-6">
                                            {emailValue}
                                        </p>
                                        <div className="bg-[#e6e6e6] rounded-xl p-4 mb-6
                                            shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
                                            <p className="text-amber-700 text-sm">
                                                <span className="font-semibold">Tip:</span> If you don't see the email, check your spam folder or request a new link.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setIsEmailSent(false)}
                                            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center gap-2 mx-auto"
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                                            Try another email
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Security Note */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                                <FontAwesomeIcon icon={faShieldHalved} />
                                <span>Your information is secure and encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}