'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faShieldHalved,
    faLock,
    faCheckCircle,
    faSpinner,
    faKey,
    faEnvelopeOpenText,
    faRotateRight,
    faCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import { verfiyRestCode } from "../server/forgetPassword.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyForgetPasswordScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    // Countdown timer for resend
    useEffect(() => {
        if (resendTimer > 0 && !canResend) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        } else if (resendTimer === 0) {
            setCanResend(true);
        }
    }, [resendTimer, canResend]);

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only take the last character
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current is empty
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newCode = [...code];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) newCode[index] = char;
        });
        setCode(newCode);
        // Focus the next empty input or the last one
        const nextEmptyIndex = newCode.findIndex(c => c === '');
        inputRefs.current[nextEmptyIndex === -1 ? 5 : nextEmptyIndex]?.focus();
    };

    const handleResend = () => {
        setResendTimer(60);
        setCanResend(false);
        toast.info('Reset code has been resent to your email');
        // You can call the forgetPassword action here again if needed
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resetCode = code.join('');

        if (resetCode.length !== 6) {
            toast.error('Please enter the complete 6-digit code');
            return;
        }

        setIsLoading(true);
        try {
            const response = await verfiyRestCode(resetCode);
            toast.success(response.message || 'Code verified successfully!');
            setIsVerified(true);
            // Redirect to reset password page after a short delay
            setTimeout(() => {
                router.push('/reset-password');
            }, 1500);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Invalid code. Please try again.';
            toast.error(errorMessage);
            // Clear the code on error
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
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
                                <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-blue-500 text-7xl xl:text-8xl" />
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#e6e6e6] rounded-2xl flex items-center justify-center
                                shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                                <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-600 text-2xl" />
                            </div>
                            <div className="absolute -bottom-2 -left-6 w-14 h-14 bg-[#e6e6e6] rounded-xl flex items-center justify-center
                                shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                                <FontAwesomeIcon icon={faKey} className="text-amber-500 text-xl" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center max-w-md">
                            <h2 className="text-2xl xl:text-3xl font-bold text-gray-800 mb-4">
                                Check Your Email
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                We've sent a 6-digit verification code to your email address. Enter the code below to verify your identity.
                            </p>

                            {/* Trust Features */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center p-4 bg-[#e6e6e6] rounded-2xl
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                                    <div className="w-10 h-10 bg-[#e6e6e6] rounded-full flex items-center justify-center mb-2
                                        shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                        <FontAwesomeIcon icon={faShieldHalved} className="text-blue-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">Secure Code</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-[#e6e6e6] rounded-2xl
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                                    <div className="w-10 h-10 bg-[#e6e6e6] rounded-full flex items-center justify-center mb-2
                                        shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">Easy Verify</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-[#e6e6e6] rounded-2xl
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                                    <div className="w-10 h-10 bg-[#e6e6e6] rounded-full flex items-center justify-center mb-2
                                        shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]">
                                        <FontAwesomeIcon icon={faLock} className="text-amber-600" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 text-center">Protected</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form Section */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md">
                            {/* Back Link */}
                            <Link
                                href="/forget-password"
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-6 group"
                            >
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="text-sm group-hover:-translate-x-1 transition-transform"
                                />
                                <span className="text-sm font-medium">Back to Forgot Password</span>
                            </Link>

                            {/* Card */}
                            <div className="bg-[#e6e6e6] rounded-3xl p-6 sm:p-8 lg:p-10
                                shadow-[10px_10px_20px_#c5c5c5,-10px_-10px_20px_#ffffff]">
                                {!isVerified ? (
                                    <>
                                        {/* Header */}
                                        <div className="text-center mb-8">
                                            <div className="w-16 h-16 bg-[#e6e6e6] rounded-2xl flex items-center justify-center mx-auto mb-4
                                                shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                                                <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-blue-500 text-2xl" />
                                            </div>
                                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                                                Verify Code
                                            </h1>
                                            <p className="text-gray-500 text-sm sm:text-base">
                                                Enter the 6-digit code sent to your email
                                            </p>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* OTP Input Fields */}
                                            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                                                {code.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        ref={(el) => { inputRefs.current[index] = el; }}
                                                        type="text"
                                                        inputMode="numeric"
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleChange(index, e.target.value)}
                                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                                        className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl bg-[#e6e6e6] transition-all focus:outline-none ${digit
                                                                ? 'text-blue-600 shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]'
                                                                : 'text-gray-800 shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]'
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Timer & Resend */}
                                            <div className="text-center">
                                                {canResend ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleResend}
                                                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-2 mx-auto transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faRotateRight} className="text-xs" />
                                                        Resend Code
                                                    </button>
                                                ) : (
                                                    <p className="text-gray-500 text-sm">
                                                        Resend code in <span className="font-semibold text-blue-600">{resendTimer}s</span>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isLoading || code.some(d => d === '')}
                                                className="w-full bg-[#e6e6e6] text-blue-700 font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
                                                    shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]
                                                    active:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                                        <span>Verifying...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                        <span>Verify Code</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        {/* Help Text */}
                                        <div className="mt-8 p-4 bg-[#e6e6e6] rounded-xl
                                            shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
                                            <p className="text-amber-700 text-sm text-center">
                                                <span className="font-semibold">Didn't receive the code?</span> Check your spam folder or request a new code.
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
                                            Code Verified!
                                        </h2>
                                        <p className="text-gray-500 mb-6">
                                            Your identity has been verified successfully.
                                        </p>
                                        <p className="text-emerald-600 font-medium">
                                            Redirecting to reset password...
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Security Note */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                                <FontAwesomeIcon icon={faShieldHalved} />
                                <span>Your code expires in 10 minutes for security</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}