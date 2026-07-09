"use client";

import { Order } from "../types/ordsers.types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import OrderCart from "../components/orderCart";

interface OrdersScreenProps {
    orders: Order[];
}

export default function OrdersScreen({ orders }: OrdersScreenProps) {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const toggleOrderDetails = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="min-h-screen bg-[#e6e6e6] py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8" data-aos="fade-down">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 bg-[#e6e6e6] rounded-2xl flex items-center justify-center
                            shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                            <FontAwesomeIcon
                                icon={faShoppingBag}
                                className="text-emerald-600 text-2xl"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
                            <p className="text-gray-500">
                                Track and manage your {orders.length} orders
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/products"
                        className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                        <FontAwesomeIcon icon={faShoppingBag} className="text-sm" />
                        Continue Shopping
                    </Link>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="bg-[#e6e6e6] rounded-2xl p-12 text-center
                            shadow-[inset_5px_5px_10px_#c5c5c5,inset_-5px_-5px_10px_#ffffff]" data-aos="zoom-in">
                            <div className="h-20 w-20 bg-[#e6e6e6] rounded-full flex items-center justify-center mx-auto mb-4
                                shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]">
                                <FontAwesomeIcon
                                    icon={faShoppingBag}
                                    className="text-gray-400 text-3xl"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                No orders yet
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Start shopping to see your orders here
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#e6e6e6] text-emerald-700 rounded-xl transition-all font-medium
                                    shadow-[4px_4px_8px_#c5c5c5,-4px_-4px_8px_#ffffff]
                                    active:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        orders.map((order, idx) => (
                            <div key={order._id} data-aos="fade-up" data-aos-delay={100 + idx * 50}>
                                <OrderCart
                                    order={order}
                                    isExpanded={expandedOrder === order._id}
                                    onToggle={() => toggleOrderDetails(order._id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}