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

export default function PaymentMethod({ selectedMethod, changeMethod }: PaymentMethodProps ) {
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");

    return (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Section Header */}
            <div className="bg-emerald-600 text-white p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <FontAwesomeIcon icon={faCreditCard} className="text-base sm:text-lg" />
                    <div>
                        <h3 className="font-semibold text-sm sm:text-base">Payment Method</h3>
                        <p className="text-xs sm:text-sm text-emerald-100">
                            Choose how you'd like to pay
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment Options */}
            <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                {/* Cash on Delivery */}
                <label
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === "cash"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <span
                        className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0 ${selectedMethod === "cash"
                                ? "bg-emerald-500 text-white"
                                : "bg-gray-100 text-gray-500"
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
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === "card"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <span
                        className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center shrink-0 ${selectedMethod === "card"
                                ? "bg-emerald-500 text-white"
                                : "bg-gray-100 text-gray-500"
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
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100">
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
