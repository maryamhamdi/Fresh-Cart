"use client";

import Image from "next/image";
import visa from '../../../assets/images/visa.png'
import amex from '../../../assets/images/amex.png'
import master from '../../../assets/images/mastercard.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCreditCard,
    faMoneyBill,
    faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface PaymentMethodProps {
    selectedMethod: "cash" | "card",
    changeMethod: (method: "cash" | "card") => void
}

export default function PaymentMethod({ selectedMethod, changeMethod }: PaymentMethodProps) {
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

    return (
        <div className="bg-[#e6e6e6] rounded-xl sm:rounded-2xl overflow-hidden
            shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
            {/* Section Header */}
            <div className="p-3 sm:p-4 shadow-[inset_0_-3px_6px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-[#e6e6e6] flex items-center justify-center text-emerald-600
                        shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]">
                        <FontAwesomeIcon icon={faCreditCard} className="text-base sm:text-lg" />
                    </span>
                    <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800">Payment Method</h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Choose how you'd like to pay
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment Options */}
            <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                {/* Cash on Delivery */}
                <label
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all bg-[#e6e6e6] ${selectedMethod === "cash"
                            ? "shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                            : "shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]"
                        }`}
                >
                    <span
                        className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0 bg-[#e6e6e6] ${selectedMethod === "cash"
                                ? "text-emerald-600 shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                                : "text-gray-500 shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]"
                            }`}
                    >
                        <FontAwesomeIcon icon={faMoneyBill} className="text-sm sm:text-base" />
                    </span>
                    <div className="flex-1 min-w-0">
                        <p
                            className={`font-semibold text-sm sm:text-base ${selectedMethod === "cash" ? "text-emerald-700" : "text-gray-700"
                                }`}
                        >
                            Cash on Delivery
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Pay when your order arrives
                        </p>
                    </div>
                    {/* conditional right icon */}
                    <div className="shrink-0">
                        {selectedMethod === "cash" && (
                            <span className="text-emerald-500">
                                <FontAwesomeIcon icon={faCircleCheck} className="text-xl sm:text-2xl" />
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        id="paymentMethod"
                        onClick={() => changeMethod("cash")}
                        className="h-5 w-5 text-emerald-600 focus:ring-emerald-500"
                    ></button>

                </label>

                {/* Pay Online */}
                <label
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all bg-[#e6e6e6] ${selectedMethod === "card"
                            ? "shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                            : "shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]"
                        }`}
                >
                    <span
                        className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0 bg-[#e6e6e6] ${selectedMethod === "card"
                                ? "text-emerald-600 shadow-[inset_2px_2px_4px_#c5c5c5,inset_-2px_-2px_4px_#ffffff]"
                                : "text-gray-500 shadow-[2px_2px_4px_#c5c5c5,-2px_-2px_4px_#ffffff]"
                            }`}
                    >
                        <FontAwesomeIcon icon={faCreditCard} className="text-sm sm:text-base" />
                    </span>
                    <div className="flex-1 min-w-0">
                        <p
                            className={`font-semibold text-sm sm:text-base ${selectedMethod === "card" ? "text-emerald-700" : "text-gray-700"
                                }`}
                        >
                            Pay Online
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Secure payment via Stripe
                        </p>
                        {/* Card Icons */}
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                            <Image
                                src={visa}
                                alt="Visa"
                                className="object-contain h-4 w-auto sm:size-6"
                            />
                            <Image
                                src={master}
                                alt="Mastercard"
                                className="object-contain h-4 w-auto sm:size-6"
                            />
                            <Image
                                src={amex}
                                alt="American Express"
                                className="object-contain h-4 w-auto sm:size-6"
                            />
                        </div>
                    </div>
                    {/* conditional right icon */}
                    <div className="shrink-0">
                        {selectedMethod === "card" && (
                            <span className="text-emerald-500">
                                <FontAwesomeIcon icon={faCircleCheck} className="text-xl sm:text-2xl" />
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        id="paymentMethod"
                        onClick={() => changeMethod("card")}
                        className="h-5 w-5 text-emerald-600 focus:ring-emerald-500"
                    ></button>
                </label>

                {/* Security Notice */}
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[#e6e6e6] rounded-lg sm:rounded-xl
                    shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500 text-sm sm:text-base shrink-0" />
                    <div className="min-w-0">
                        <p className="font-medium text-emerald-700 text-sm sm:text-base">Secure & Encrypted</p>
                        <p className="text-xs sm:text-sm text-emerald-600">
                            256-bit SSL encryption
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}