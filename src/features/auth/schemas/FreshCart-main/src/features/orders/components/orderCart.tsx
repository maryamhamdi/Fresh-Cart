"use client";

import { Order } from "../types/ordsers.types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faBox,
    faLocationDot,
    faChevronDown,
    faCreditCard,
    faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

interface OrderCartProps {
    order: Order;
    isExpanded: boolean;
    onToggle: () => void;
}

export default function OrderCart({ order, isExpanded, onToggle }: OrderCartProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getTotalItems = () => {
        return order.cartItems.reduce((total, item) => total + item.count, 0);
    };

    const getStatusBadge = () => {
        if (order.isDelivered) {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Delivered
                </span>
            );
        }
        if (order.isPaid) {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Shipped
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Processing
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Order Card Header */}
            <div className="p-6">
                <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="h-20 w-20 bg-gray-100 rounded-xl overflow-hidden">
                            {order.cartItems[0]?.product?.imageCover ? (
                                <Image
                                    src={order.cartItems[0].product.imageCover}
                                    alt={order.cartItems[0].product.title}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faBox}
                                        className="text-gray-400 text-2xl"
                                    />
                                </div>
                            )}
                        </div>
                        {order.cartItems.length > 1 && (
                            <span className="absolute -top-2 -right-2 h-6 w-6 bg-gray-700 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                +{order.cartItems.length - 1}
                            </span>
                        )}
                    </div>

                    {/* Order Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            {getStatusBadge()}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            # {order.id}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faCalendar} className="text-gray-400" />
                                {formatDate(order.createdAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faBox} className="text-gray-400" />
                                {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faLocationDot} className="text-gray-400" />
                                {order.shippingAddress.city}
                            </span>
                        </div>
                        <p className="text-xl font-bold text-gray-900 mt-3">
                            {order.totalOrderPrice.toLocaleString()}{" "}
                            <span className="text-sm font-normal text-gray-500">EGP</span>
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <div 
                            className="h-10 w-10 rounded-lg border border-gray-200 flex items-center justify-center" 
                            title={order.paymentMethodType === "card" ? "Credit Card" : "Cash on Delivery"}
                        >
                            <FontAwesomeIcon 
                                icon={order.paymentMethodType === "card" ? faCreditCard : faMoneyBill} 
                                className={order.paymentMethodType === "card" ? "text-blue-500" : "text-green-500"} 
                            />
                        </div>
                        <button
                            onClick={onToggle}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border font-medium transition-all duration-300 ${
                                isExpanded 
                                    ? "bg-primary-500 text-white border-primary-500" 
                                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            Details
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`text-sm transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Order Details */}
            {isExpanded && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                    <div className="space-y-3">
                        {order.cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-4 bg-white p-4 rounded-xl"
                            >
                                <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    {item.product?.imageCover ? (
                                        <Image
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FontAwesomeIcon
                                                icon={faBox}
                                                className="text-gray-400"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-gray-900 truncate">
                                        {item.product?.title || "Product"}
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                        {item.count} × {(item.price / item.count).toLocaleString()} EGP
                                    </p>
                                </div>
                                <p className="font-semibold text-gray-900">
                                    {item.price.toLocaleString()} EGP
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Shipping Info */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">
                            Shipping Address
                        </h4>
                        <div className="text-gray-600">
                            <p>{order.shippingAddress.city}</p>
                            <p>{order.shippingAddress.details}</p>
                            <p>Phone: {order.shippingAddress.phone}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">
                            Payment Details
                        </h4>
                        <div className="flex justify-between text-gray-600">
                            <span>Payment Method</span>
                            <span className="capitalize font-medium">
                                {order.paymentMethodType === "card"
                                    ? "Credit Card"
                                    : "Cash on Delivery"}
                            </span>
                        </div>
                        <div className="flex justify-between text-gray-600 mt-2">
                            <span>Payment Status</span>
                            <span
                                className={`font-medium ${
                                    order.isPaid ? "text-green-600" : "text-orange-500"
                                }`}
                            >
                                {order.isPaid ? "Paid" : "Pending"}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
