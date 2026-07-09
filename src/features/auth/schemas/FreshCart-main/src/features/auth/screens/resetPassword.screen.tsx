'use client'

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faArrowLeft, 
    faShieldHalved, 
    faLock, 
    faCheckCircle,
    faSpinner,
    faKey,
    faEye,
    faEyeSlash,
    faUnlockKeyhole,
    faCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import { resetPassword } from "../server/forgetPassword.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { resetPasswordSchema, ResetPasswordFormData } from "../schemas/resetPasswordSchema";

export default function ResetPasswordScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Get email from sessionStorage
        const storedEmail = sessionStorage.getItem('resetEmail');
        if (!storedEmail) {
            toast.error('Please start the password reset process from the beginning');
            router.push('/forget-password');
        } else {
            setEmail(storedEmail);
        }
    }, [router]);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordFormData>({
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        },
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onChange'
    });

    const passwordValue = watch('newPassword');

    // Password strength checker
    const getPasswordStrength = () => {
        if (!passwordValue) return { strength: 0, label: '', color: '' };
        let strength = 0;
        if (passwordValue.length >= 8) strength++;
        if (/[a-z]/.test(passwordValue)) strength++;
        if (/[A-Z]/.test(passwordValue)) strength++;
        if (/[0-9]/.test(passwordValue)) strength++;
        if (/[!@#$%^&*()\[\]{}\-_+=~`|:;"'<>,./?]/.test(passwordValue)) strength++;

        if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 3) return { strength: 2, label: 'Fair', color: 'bg-amber-500' };
        if (strength <= 4) return { strength: 3, label: 'Good', color: 'bg-blue-500' };
        return { strength: 4, label: 'Strong', color: 'bg-emerald-500' };
    };

    const passwordStrength = getPasswordStrength();

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!email) {
            toast.error('Email not found. Please restart the process.');
            router.push('/forget-password');
            return;
        }

        setIsLoading(true);
        try {
            const response = await resetPassword(email, data.newPassword);
            toast.success(response.message || 'Password reset successfully!');
            setIsSuccess(true);
            // Clear sessionStorage
            sessionStorage.removeItem('resetEmail');
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Failed to reset password. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
                    
                    {/* Left Side - Hero Section */}
                    <div className="hidden lg:flex flex-col items-center justify-center p-8 xl:p-12">
                        {/* Illustration */}
                        <div className="relative mb-8">
                            <div className="w-64 h-64 xl:w-80 xl:h-80 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200">
                                <FontAwesomeIcon icon={faUnlockKeyhole} className="text-white text-7xl xl:text-8xl" />
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                                <FontAwesomeIcon icon={faKey} className="text-white text-2xl" />
                            </div>
                            <div className="absolute -bottom-2 -left-6 w-14 h-14 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                                <FontAwesomeIcon icon={faShieldHalved} className="text-white text-xl" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center max-w-md">
                            <h2 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4">
                                Create New Password
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Your new password must be different from previously used passwords. Make it strong and secure.
                            </p>

                            {/* Security Tips */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-500" />
                                    Password Requirements
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${passwordValue?.length >= 8 ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                        At least 8 characters long
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(passwordValue || '') ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                        One lowercase letter
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(passwordValue || '') ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                        One uppercase letter
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(passwordValue || '') ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                        One number
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${/[!@#$%^&*()\[\]{}\-_+=~`|:;"'<>,./?]/.test(passwordValue || '') ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                                        One special character
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form Section */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md">
                            {/* Back Link */}
                            <Link 
                                href="/verify-code" 
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 group"
                            >
                                <FontAwesomeIcon 
                                    icon={faArrowLeft} 
                                    className="text-sm group-hover:-translate-x-1 transition-transform" 
                                />
                                <span className="text-sm font-medium">Back to Verify Code</span>
                            </Link>

                            {/* Card */}
                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 lg:p-10 border border-gray-100">
                                {!isSuccess ? (
                                    <>
                                        {/* Header */}
                                        <div className="text-center mb-8">
                                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                                                <FontAwesomeIcon icon={faLock} className="text-white text-2xl" />
                                            </div>
                                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                                Reset Password
                                            </h1>
                                            <p className="text-gray-500 text-sm sm:text-base">
                                                Create a new secure password for your account
                                            </p>
                                            {email && (
                                                <p className="text-emerald-600 text-sm mt-2 font-medium">
                                                    {email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                            {/* New Password Field */}
                                            <div>
                                                <label 
                                                    htmlFor="newPassword" 
                                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                                >
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <FontAwesomeIcon 
                                                            icon={faLock} 
                                                            className={`text-sm ${errors.newPassword ? 'text-red-400' : 'text-gray-400'}`} 
                                                        />
                                                    </div>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        id="newPassword"
                                                        {...register("newPassword")}
                                                        className={`w-full pl-11 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all text-gray-900 placeholder:text-gray-400 ${
                                                            errors.newPassword 
                                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                                                                : 'border-gray-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'
                                                        }`}
                                                        placeholder="Enter new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                                    >
                                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                    </button>
                                                </div>
                                                
                                                {/* Password Strength Indicator */}
                                                {passwordValue && (
                                                    <div className="mt-3">
                                                        <div className="flex items-center justify-between text-xs mb-1.5">
                                                            <span className="text-gray-500">Password Strength</span>
                                                            <span className={`font-medium ${
                                                                passwordStrength.strength === 1 ? 'text-red-500' :
                                                                passwordStrength.strength === 2 ? 'text-amber-500' :
                                                                passwordStrength.strength === 3 ? 'text-blue-500' :
                                                                'text-emerald-500'
                                                            }`}>
                                                                {passwordStrength.label}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {[1, 2, 3, 4].map((level) => (
                                                                <div 
                                                                    key={level}
                                                                    className={`h-1.5 flex-1 rounded-full transition-all ${
                                                                        level <= passwordStrength.strength 
                                                                            ? passwordStrength.color 
                                                                            : 'bg-gray-200'
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {errors.newPassword && (
                                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                        {errors.newPassword.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Confirm Password Field */}
                                            <div>
                                                <label 
                                                    htmlFor="confirmPassword" 
                                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                                >
                                                    Confirm Password
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <FontAwesomeIcon 
                                                            icon={faLock} 
                                                            className={`text-sm ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} 
                                                        />
                                                    </div>
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        id="confirmPassword"
                                                        {...register("confirmPassword")}
                                                        className={`w-full pl-11 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all text-gray-900 placeholder:text-gray-400 ${
                                                            errors.confirmPassword 
                                                                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                                                                : 'border-gray-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'
                                                        }`}
                                                        placeholder="Confirm new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                                    >
                                                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                                    </button>
                                                </div>
                                                {errors.confirmPassword && (
                                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                        {errors.confirmPassword.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                        <span>Resetting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faKey} />
                                                        <span>Reset Password</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {/* Mobile Password Requirements */}
                                        <div className="lg:hidden mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                                <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-500" />
                                                Password Requirements
                                            </h3>
                                            <ul className="space-y-1.5 text-xs text-gray-600">
                                                <li className="flex items-center gap-2">
                                                    <FontAwesomeIcon 
                                                        icon={faCircleCheck} 
                                                        className={passwordValue?.length >= 8 ? 'text-emerald-500' : 'text-gray-300'} 
                                                    />
                                                    At least 8 characters
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <FontAwesomeIcon 
                                                        icon={faCircleCheck} 
                                                        className={/[a-z]/.test(passwordValue || '') ? 'text-emerald-500' : 'text-gray-300'} 
                                                    />
                                                    One lowercase letter
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <FontAwesomeIcon 
                                                        icon={faCircleCheck} 
                                                        className={/[A-Z]/.test(passwordValue || '') ? 'text-emerald-500' : 'text-gray-300'} 
                                                    />
                                                    One uppercase letter
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <FontAwesomeIcon 
                                                        icon={faCircleCheck} 
                                                        className={/[0-9]/.test(passwordValue || '') ? 'text-emerald-500' : 'text-gray-300'} 
                                                    />
                                                    One number
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <FontAwesomeIcon 
                                                        icon={faCircleCheck} 
                                                        className={/[!@#$%^&*()\[\]{}\-_+=~`|:;"'<>,./?]/.test(passwordValue || '') ? 'text-emerald-500' : 'text-gray-300'} 
                                                    />
                                                    One special character
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    /* Success State */
                                    <div className="text-center py-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200 animate-pulse">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-white text-4xl" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                            Password Reset Successfully!
                                        </h2>
                                        <p className="text-gray-500 mb-6">
                                            Your password has been updated. You can now sign in with your new password.
                                        </p>
                                        <p className="text-emerald-600 font-medium">
                                            Redirecting to login...
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Security Note */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                                <FontAwesomeIcon icon={faShieldHalved} />
                                <span>Your password is encrypted and secure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
